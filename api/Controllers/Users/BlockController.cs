using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Cache;
using api.Dtos;
using api.Helper;
using api.Middleware;
using AutoMapper;
using core.Entities;
using core.Interfaces;
using core.Interfaces.Redis;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Users
{
    [Authorize]
    [Route("[Controller]")]
    public class BlockController : ApiBaseController
    {
        public readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IRedisService _redisService;
        
        public BlockController(IUnitOfWork unitOfWork, IMapper mapper, IRedisService redisService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

            _redisService = redisService;
        }

        
        [HttpPost("{userId}")]
        public async Task<IActionResult> AddToBlockList(string userId)
        {
            
            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == userId))
                return NotFound(new Response<string>());

            if(await _unitOfWork.AdminBlockRepository.ExistsAsync(filter => filter.UserId == userId)) return StatusCode(403, "admin_block"); 

            
            if(await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.BlockId == userId))
                return BadRequest(new Response<string>("Already_block"));
            
            
            var block = new UBlock 
            {
                UserId = User.GetUserId(),
                BlockId = userId
            };

            

            var otherUser = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == userId && filter.isBlock == false);

            if(await _unitOfWork.FollowRepository.ExistsAsync(filter => filter.UserId == otherUser.id && filter.Following == User.GetUserId())) otherUser.TotalFollowings--;
            if(await _unitOfWork.FollowRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.Following == otherUser.id)) otherUser.TotalFollowers--;


            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == User.GetUserId() && filter.isBlock == false);
            if(await _unitOfWork.FollowRepository.ExistsAsync(filter => filter.UserId == user.id && filter.Following == User.GetUserId())) user.TotalFollowings--;
            if(await _unitOfWork.FollowRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.Following == user.id)) user.TotalFollowers--;



            _unitOfWork.UserRepository.ReplaceOneAsync(user.id, user);
            _unitOfWork.UserRepository.ReplaceOneAsync(otherUser.id, otherUser); 


            _unitOfWork.NotificationRepository.UpdateBlockAttribute(User.GetUserId(), userId, true);
            _unitOfWork.NotificationRepository.UpdateBlockAttribute(userId, User.GetUserId(), true);

            _unitOfWork.FollowRepository.DeleteOneAsync(filter => filter.UserId == User.GetUserId() && filter.Following == userId);
            _unitOfWork.FollowRepository.DeleteOneAsync(filter => filter.UserId == userId && filter.Following == User.GetUserId());

        
            _unitOfWork.FollowRepository.DeleteOneAsync(filter => filter.UserId == userId && filter.Following == User.GetUserId());
            _unitOfWork.FollowRepository.DeleteOneAsync(filter => filter.UserId == User.GetUserId() && filter.Following == userId);

            _unitOfWork.UserBlockRepository.InsertOneAsync(block);

            await _redisService.DeleteAllkeysAsnyc();

            return await _unitOfWork.Commit() ? Ok(new Response<string>("blocked successfully")) : BadRequest(new Response<string>("Error to block"));
        }
        

        [HttpDelete("{userId}")]
        public async Task<IActionResult> RemoveFromBlcokList(string userId)
        {
            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == userId)) 
                return NotFound(new Response<string>("User Doesn't exits"));
            
            if(!await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.BlockId == userId))
               return BadRequest(new Response<string>("Already unblocked"));


            _unitOfWork.UserBlockRepository.DeleteOneAsync(filter => filter.UserId == User.GetUserId() && filter.BlockId == userId);

            _unitOfWork.NotificationRepository.UpdateBlockAttribute(User.GetUserId(), userId, false);
            _unitOfWork.NotificationRepository.UpdateBlockAttribute(userId, User.GetUserId(), false);


            await _redisService.DeleteAllkeysAsnyc();
            return await _unitOfWork.Commit() ? Ok(new Response<string>("unblocked successfully")) : BadRequest(new Response<string>("Error to unblock"));
        }


        [HttpGet]
        [Cached(60)]
        public async Task<IActionResult> GetBlockLists([FromQuery]PaginationFilter filter)
        {
            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            Expression<Func<UBlock, Object>> sortByCreateDate = (s) => s.CreatedAt;

            var blockList = await _unitOfWork.UserBlockRepository.FindManyAsync(filter => filter.UserId == User.GetUserId(), sortByCreateDate, _filter.PageNumber, _filter.PageSize);


            var userList = new List<MemberDto>();
            foreach(var block in blockList)
            {
                var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == block.BlockId);

                userList.Add(_mapper.Map<MemberDto>(user));
            }
            
            var totallCount = await _unitOfWork.UserBlockRepository.CountAsync(filter => filter.UserId == User.GetUserId());
            
            var pagedResponse = new PagedResponse<IEnumerable<MemberDto>>(userList, _filter.PageNumber, _filter.PageSize, totallCount);
            return Ok(pagedResponse);
        }
    
    }
}
