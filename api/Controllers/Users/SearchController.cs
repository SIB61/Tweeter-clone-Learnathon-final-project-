
using api.Cache;
using api.Dtos;
using api.Helper;
using api.Middleware;
using AutoMapper;
using core.Entities;
using core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api2.Controllers.Users
{
    [Authorize]
    [ApiController]
    [Route("[Controller]")]
    public class SearchController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        
        public SearchController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        [HttpGet]
        [Route("users")]
        [Cached(120)]
        public async Task<IActionResult> SearchUser([FromQuery]string fullName, [FromQuery]PaginationFilter filter)
        {
            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            int count = 0;
            int bcount = 0;
            var userList = new List<SUserDto>();

            while(true)
            {
                var users = await _unitOfWork.UserRepository.SearchingUsers(fullName, _filter.PageNumber++, _filter.PageSize);

                if(users.Count() == 0 || count >= _filter.PageSize) break;

                foreach(var user in users)
                {
                    if(await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.BlockId == user.id)

                        || 

                      await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == user.id && filter.BlockId == User.GetUserId()) 
                     ) {bcount++; continue;}

                    var _user = _mapper.Map<SUserDto>(user);
                    _user.isFollow = await _unitOfWork.FollowRepository.ExistsAsync( filter => filter.UserId == User.GetUserId() && filter.Following == user.id);
                    userList.Add(_user);
                    count++;
                } 
            }
            
            var totallCount = await _unitOfWork.UserRepository.SearchingUsersCountAsync(fullName) - bcount;
            var pagedResponse = new PagedResponse<IEnumerable<SUserDto>>(userList, filter.PageNumber, filter.PageSize, totallCount);
            return Ok(pagedResponse);
        }
   
   
   
        [HttpGet]
        [Route("tweets")]
        [Cached(120)]
        public async Task<IActionResult> SearchTweet([FromQuery]string hashTag, [FromQuery] PaginationFilter filter)
        {
            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var result = await _unitOfWork.TweetRepository.SearchTweet(hashTag, _filter.PageNumber, _filter.PageSize);
        
            var tweetList = await this.addLikedAndFilterBlockTweet(User.GetUserId(), result);
            

            var totallCount = await _unitOfWork.TweetRepository.HashTagPostCount(hashTag!);
            var pagedResponse = new PagedResponse<IEnumerable<TweetDto>>(tweetList, _filter.PageNumber, _filter.PageSize, totallCount);
            return Ok(pagedResponse);
        }




        private async Task<IEnumerable<TweetDto>> addLikedAndFilterBlockTweet(string userId, IEnumerable<Tweet> tweets)
        {
            var tweetList = new List<TweetDto>();
            foreach (var tweet in tweets)
            {
                var _tweet = _mapper.Map<TweetDto>(tweet);

                if(!_tweet.IsRetweet){
                    _tweet.FullName = await _unitOfWork.UserRepository.FilterOneAsync(filter => filter.id == _tweet.UserId, projectionExpression: filter => filter.FullName);

                    _tweet.UserName = await _unitOfWork.UserRepository.FilterOneAsync(filter => filter.id == _tweet.UserId, projectionExpression: filter => filter.UserName);

                    _tweet.isLiked = await _unitOfWork.LikeRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.TweetId == tweet.id);
                }

                if (_tweet.IsRetweet)
                {
                    var retweet = await _unitOfWork.TweetRepository.FindOneAsync(filter => filter.id == _tweet.Content);
                    if (!await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == userId && filter.BlockId == retweet.UserId))
                    {
                        _tweet.ParentTweet = _mapper.Map<TweetDto>(retweet);
                        _tweet.ParentTweet.UserName = await _unitOfWork.UserRepository.FilterOneAsync(filter => filter.id == retweet.UserId, projectionExpression: filter => filter.UserName);

                        _tweet.ParentTweet.FullName = await _unitOfWork.UserRepository.FilterOneAsync(filter => filter.id == retweet.UserId, projectionExpression: filter => filter.FullName);
                        _tweet.ParentTweet.isLiked = await _unitOfWork.LikeRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.TweetId == retweet.id);
                    }
                }

                tweetList.Add(_tweet);
            }

            return tweetList;
        }
       
    }
}