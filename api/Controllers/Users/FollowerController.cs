
using System.Linq.Expressions;
using api.Cache;
using api.Dtos;
using api.Helper;
using api.Middleware;
using AutoMapper;
using core.Entities;
using core.Interfaces;
using core.Interfaces.RabbitMQ;
using core.Interfaces.Redis;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Users
{

    [Authorize]
    [Route("{userId}")]
    public class FollowerController : ApiBaseController
    {
        private readonly IPublish<Notification> _notificationPublish;
       
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IRedisService _redisService;

        public FollowerController(IPublish<Notification> notificationPublish , IMapper mapper, IUnitOfWork unitOfWork, IRedisService redisService)
        {
            _unitOfWork = unitOfWork;
            _notificationPublish = notificationPublish;
            _mapper = mapper;

            _redisService = redisService;
        }


        [HttpGet("followers")]
        [Cached(60)]
        public async Task<IActionResult> GetFollwer([FromRoute]string userId, [FromQuery]PaginationFilter filter)
        {
            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            Expression<Func<Follow, Object>> sortByCreateDate = (s) => s.CreatedAt;
            var result = await _unitOfWork.FollowRepository.FindManyAsync(filter => filter.Following == userId, sortByCreateDate, _filter.PageNumber, _filter.PageSize);
            var myFollower = await this.getUsers(result, true);

            var totallCount = await _unitOfWork.FollowRepository.CountAsync(filter => filter.Following == User.GetUserId());
            var pagedResponse = new PagedResponse<IEnumerable<FollwerDto>>(myFollower, _filter.PageNumber, _filter.PageSize, totallCount);
            return Ok(pagedResponse);
        }


        [HttpGet("followings")]
        [Cached(60)]
        public async Task<IActionResult> Following([FromRoute]string userId, [FromQuery]PaginationFilter filter)
        {
            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            Expression<Func<Follow, Object>> sortByCreateDate = (s) => s.CreatedAt;
            
            var result = await _unitOfWork.FollowRepository.FindManyAsync(filter => filter.UserId == userId, sortByCreateDate, _filter.PageNumber, _filter.PageSize);
            var totallCount = await _unitOfWork.FollowRepository.CountAsync(filter => filter.UserId == userId);

            var followings = await getUsers(result, false);

            var pagedResponse = new PagedResponse<IEnumerable<FollwerDto>>(followings, _filter.PageNumber, _filter.PageSize, totallCount);
            return Ok(pagedResponse);
        }

        
    
      
        [HttpPost("follow")]
        public async Task<IActionResult> Follow([FromRoute]string userId)
        {
            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == userId)) 
                return NotFound();
                

            if(await _unitOfWork.AdminBlockRepository.ExistsAsync(filter => filter.UserId == userId)) return StatusCode(403, "admin_block");
            

            if(User.GetUserId() == userId)
                return BadRequest(new Response<string>("You can't follow yourself"));

            if(await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.BlockId == userId) 

                 || 
            
                await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == userId && filter.BlockId == User.GetUserId())
             ) return StatusCode(403, "user_blocked");



            if(await _unitOfWork.FollowRepository.ExistsAsync( x => x.UserId == User.GetUserId() && x.Following == userId))
                return BadRequest(new Response<string>("Already follow"));

            
            var follow = new Follow 
            {
                UserId = User.GetUserId(),
                Following = userId
            };

            var notification = new Notification
            {
                To = userId,
                From = User.GetUserId(),
                FullName = User.GetFullName(),
                Type = "FOLLOW"
            };

            
            if(notification.To != notification.From)
                await _notificationPublish.publish(notification);


            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == User.GetUserId());
            user.TotalFollowings++;
            var otherUser = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == userId);
            otherUser.TotalFollowers++;

            _unitOfWork.FollowRepository.InsertOneAsync(follow);
            _unitOfWork.UserRepository.ReplaceOneAsync(User.GetUserId(), user);
            _unitOfWork.UserRepository.ReplaceOneAsync(otherUser.id, otherUser);
            _unitOfWork.NotificationRepository.InsertOneAsync(notification);
            
            await _redisService.DeleteAllkeysAsnyc();

            return await _unitOfWork.Commit() ? Ok(new Response<string>("Added")) : BadRequest(new Response<string>("Failed_To_Add")); 
        }


        [HttpDelete("follow")]
        public async Task<IActionResult> UnFollow([FromRoute]string userId)
        {
            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == userId))
                return NotFound(new Response<string>("Not Found"));
            if(User.GetUserId() == userId)
                return BadRequest(new Response<string>("You can't unfollow yourself"));
            
            if(!await _unitOfWork.FollowRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.Following == userId)){
                return  BadRequest(new Response<string>("Already un-follow"));
            }



            _unitOfWork.FollowRepository.DeleteOneAsync( filter => filter.UserId == User.GetUserId() && filter.Following == userId);

            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == User.GetUserId());
            user.TotalFollowings--;
            _unitOfWork.UserRepository.ReplaceOneAsync(User.GetUserId(), user);
            
            var otherUser = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == userId);
            otherUser.TotalFollowers--;
            _unitOfWork.UserRepository.ReplaceOneAsync(userId, otherUser);


            await _redisService.DeleteAllkeysAsnyc();

            return await _unitOfWork.Commit() ? Ok(new Response<string>("Unfollowed")) : BadRequest(new Response<string>("Error")); 
        }

        
        

        private async Task<IEnumerable<FollwerDto>> getUsers(IEnumerable<Follow>? list, bool isFollower)
        {
            var userList = new List<FollwerDto>();

            foreach(var follow in list)
            {
                var user = isFollower ? await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == follow.UserId && filter.isBlock == false) : await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == follow.Following && filter.isBlock == false);

               if(user == null) continue;

                var _follow = _mapper.Map<FollwerDto>(user);
                _follow.Since = follow.CreatedAt;

                if(isFollower){
                   
                    _follow.isFollow = await _unitOfWork.FollowRepository.ExistsAsync(filter => filter.UserId == follow.Following && filter.Following == follow.UserId) ? true : false;
                }
                else{
                    _follow.isFollow = true;
                }
                
                userList.Add(_follow);
            }

            return userList;
        }
    
    }
}
