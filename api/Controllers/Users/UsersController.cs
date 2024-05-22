using api.Dtos;
using api.Helper;
using AutoMapper;
using core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using api.Middleware;
using api.Cache;
using System.Linq.Expressions;
using core.Entities;
using core.Interfaces.Redis;

namespace api.Controllers.Users
{
    [Authorize]
    [Route("user")]
    public class UsersController  : ApiBaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IRedisService _redisServer;
        public UsersController(IUnitOfWork unitOfWork, IMapper mapper, IRedisService redisService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _redisServer = redisService;
        }


        [HttpPut]
        public async Task<IActionResult> UpdateUserDetails(UUserDto uUserDto )
        {
            if(!ModelState.IsValid)
                return BadRequest();

            var Id = User.GetUserId();
            
            if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == User.GetUserId() && filter.isBlock == true))
                return NotFound();


            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == Id);
            if(uUserDto.FullName != null) user.FullName = uUserDto.FullName;
            if(uUserDto.DateOfBirth != null) user.DateOfBirth = uUserDto.DateOfBirth;

            _unitOfWork.UserRepository.ReplaceOneAsync(Id, user);


            await _redisServer.DeleteAllkeysAsnyc();

            return (await _unitOfWork.Commit()) ? Ok(new Response<string>("Updated Successfully")) : BadRequest();
        }
          


        [HttpGet]
        [Route("get-users")]
        [Cached(60)]
        public async Task<IActionResult> GetTopUserList([FromQuery]PaginationFilter filter)
        {
            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            int totallCount =await _unitOfWork.UserRepository.CountAsync(filter => filter.isBlock == false);

            if(totallCount < filter.PageSize) filter.PageSize = totallCount;

            var userList = new List<SUserDto>();

            while(true)
            {
                if(userList.Count() >= filter.PageSize) break;


                var topUsers = await this.getTopUsers(filter, filter.PageSize - userList.Count());
                
                if(topUsers.Item2  < 0 ) break;
                
                userList.AddRange(topUsers.Item1);

                filter.PageNumber++;
            }


            var pagedResponse = new PagedResponse<IEnumerable<SUserDto>>(userList, _filter.PageNumber, _filter.PageSize, totallCount);
            return Ok(pagedResponse);
        }



        [HttpGet("{id}")]
        [Cached(60)]
        public async Task<IActionResult> GetUser(string id)
        {
          if(!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == id && filter.isBlock == false)) return NotFound();

          if(await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.BlockId == id) 

            || 
            
            await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == id && filter.BlockId == User.GetUserId())

          ) return StatusCode(403, "user_blocked");


          var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == id && filter.isBlock == false);
          var _user = _mapper.Map<SUserDto>(user);

          _user.isFollow = await _unitOfWork.FollowRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.Following == id);
          return Ok(new Response<SUserDto>(_user));
        }        
    
    




        private async Task<Tuple<List<SUserDto>, int>>  getTopUsers( PaginationFilter _filter, int count)
        {

            Expression<Func<AppUser, Object>> sortByNumOfFollower = (s) => s.TotalFollowers;
            
            var users =await _unitOfWork.UserRepository.FindManyAsync(filter => filter.id != User.GetUserId() && filter.isBlock == false, sortByNumOfFollower, _filter.PageNumber, _filter.PageSize);


            var userlist = new List<SUserDto>();

           

            foreach(var user in users)
            {
                if(count == userlist.Count()) break;
                if(
                    await _unitOfWork.UserBlockRepository.ExistsAsync( filter => filter.UserId == User.GetUserId() && filter.BlockId == user.id)

                    ||

                    await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == user.id && filter.BlockId == User.GetUserId())


                    || 

                    await _unitOfWork.FollowRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.Following == user.id)

                ) continue;

                var _user = _mapper.Map<SUserDto>(user);

                userlist.Add(_user);
            }


            return Tuple.Create(userlist, users.Count());
        }
    
    }
}
