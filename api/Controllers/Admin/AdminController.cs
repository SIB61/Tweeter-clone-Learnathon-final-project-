using System.Linq.Expressions;
using api.Cache;
using api.Dtos;
using api.Helper;
using AutoMapper;
using core.Entities;
using core.Interfaces;
using core.Interfaces.Redis;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Admin
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("[Controller]")]
    public class AdminController : ControllerBase
    {
        
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IRedisService _redisService;

        public AdminController(IUnitOfWork unitOfWork,  IMapper mapper, IRedisService redisService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _redisService = redisService;
        }


        [HttpGet("user")]
        [Cached(60)]
        public async Task<IActionResult> GetUsers([FromQuery]string? blockpros, [FromQuery]PaginationFilter filter)
        {
            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);
            Expression<Func<AppUser, Object>> sortByCreateDate = (s) => s.CreatedAt;
            Expression<Func<AppUser, bool>> searchFilter;

            


            if(blockpros == "Block") searchFilter = (s) => s.isBlock == true && s.id != User.GetUserId();
            else if(blockpros=="Unblock") searchFilter = (s) => s.isBlock == false && s.id != User.GetUserId();
            else searchFilter = s => s.id != User.GetUserId();

        

            var userList = await _unitOfWork.UserRepository.FindManyAsync(searchFilter, sortByCreateDate, _filter.PageNumber, _filter.PageSize);
            var totallCount = await _unitOfWork.UserRepository.CountAsync(searchFilter);
            var _users = _mapper.Map<IEnumerable<MemberDto>>(userList);
            var pagedResponse = new PagedResponse<IEnumerable<MemberDto>>(_users, filter.PageNumber, filter.PageSize, totallCount);
            return Ok(pagedResponse);
        }


        [HttpPost("block/{userId}")]
        public async Task<IActionResult> AddToBlockList([FromRoute]string userId)
        {
            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == userId))
                return NotFound(new Response<string>("User not found"));
            if(await _unitOfWork.AdminBlockRepository.ExistsAsync(filter => filter.UserId == userId))
                return BadRequest(new Response<string>("already block"));
            
            var block = new AdminBlock(userId);
            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == userId);
            user.isBlock = true;

            _unitOfWork.AdminBlockRepository.InsertOneAsync(block);
            _unitOfWork.UserRepository.ReplaceOneAsync(userId, user);

            await _redisService.DeleteAllkeysAsnyc();

            return await _unitOfWork.Commit() ? Ok(new Response<string>("blocked successfully")) : BadRequest(new Response<string>("Error to block"));
        }
        
    
        [HttpDelete("block/{userId}")]
        public async Task<IActionResult> RemoveFromBlockList([FromRoute]string userId)
        {
            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == userId))
                return NotFound(new Response<string>("user not found"));
            if(!await _unitOfWork.AdminBlockRepository.ExistsAsync(filter => filter.UserId == userId))
                return BadRequest(new Response<string>("Already unblocked"));
            

            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == userId);
            user.isBlock = false;
            _unitOfWork.AdminBlockRepository.DeleteOneAsync(filter => filter.UserId == userId);
            _unitOfWork.UserRepository.ReplaceOneAsync(userId, user);

            await _redisService.DeleteAllkeysAsnyc();

            return await _unitOfWork.Commit() ? Ok(new Response<string>("Unblocked")) : BadRequest(new Response<string>("Error"));
        }


        [HttpPut]
        [Route("user/{Id}")]
        public async Task<IActionResult> UpdateUserDetails([FromRoute]string Id, UUserDto uUserDto )
        {
            if(!ModelState.IsValid)
                return BadRequest(new Response<string>("BadFormate"));

            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == Id))
                return NotFound(new Response<string>("User Not Fuond"));


            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == Id);
            if(uUserDto.FullName != null) user.FullName = uUserDto.FullName;
            if(uUserDto.DateOfBirth != null) user.DateOfBirth = uUserDto.DateOfBirth;

            _unitOfWork.UserRepository.ReplaceOneAsync(Id, user);

            await _redisService.DeleteAllkeysAsnyc();

            return (await _unitOfWork.Commit()) ? Ok(new Response<string>("Updated Successfully")) : BadRequest(new Response<string>("Opp!, Not updated! An unknown expection occurs"));
        }


        [HttpPut]
        [Route("make-admin/{userId}")]
        public async Task<IActionResult> MakeAdmin([FromRoute]string userId)
        {
            
            var user = await _unitOfWork.UserRepository.FindOneAsync(filer => filer.id == userId);
            if(user == null) return NotFound();

            if(user.Role == "Admin") return BadRequest(new Response<string>("Already admin"));
            user.Role = "Admin";

            _unitOfWork.UserRepository.ReplaceOneAsync(userId, user);
            return await _unitOfWork.Commit() ? Ok(new Response<string>("you have added " + user.FullName + " as admin")) : BadRequest(new Response<string>("Error making admin"));
        }

   
    } 
}

