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
using Newtonsoft.Json;

namespace api.Controllers.Users
{
    [Authorize]
    [Route("tweet")]
    public class TweetController : ApiBaseController
    {
        private readonly IPublish<Notification> _notificationPublish;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        private readonly IRedisService _redisService;

        public TweetController(IMapper mapper, IPublish<Notification> notificationPublish, IUnitOfWork unitOfWork, IRedisService redisService)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _notificationPublish = notificationPublish;
            _redisService = redisService;
        }


        [HttpGet]
        [Route("{tweetId}")]
        [Cached(60)]
        public async Task<IActionResult> GetTweet([FromRoute] string tweetId)
        {
            if(!await _unitOfWork.TweetRepository.ExistsAsync(filter => filter.id == tweetId)) return NotFound();

            var result = await _unitOfWork.TweetRepository.FindOneAsync(filter => filter.id == tweetId);


            if(await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.BlockId == result.UserId) 

                || 

                await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == result.UserId && filter.BlockId == User.GetUserId())

                || 

                await _unitOfWork.AdminBlockRepository.ExistsAsync(filter => filter.UserId == result.UserId)
                
            ) return StatusCode(403, "user_blocked");



            var tweet = _mapper.Map<TweetDto>(result);
            
            tweet.isLiked = await _unitOfWork.LikeRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.TweetId == tweetId);

            tweet.UserName = await _unitOfWork.UserRepository.FilterOneAsync(filter => filter.id == tweet.UserId, projectionExpression: filter => filter.UserName);
            tweet.FullName = await _unitOfWork.UserRepository.FilterOneAsync(filter => filter.id == tweet.UserId, projectionExpression: filter => filter.FullName);

            return Ok(new Response<TweetDto>(tweet));
        }


        [HttpGet]
        [Route("timeline")]
        [Cached(60)]
        public async Task<IActionResult> Newsfeed([FromQuery] PaginationFilter filter)
        {

            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            var timeline = await _unitOfWork.TweetRepository.UserTimeLine(User.GetUserId(), _filter.PageNumber, _filter.PageSize);

            var jsonString = System.Text.Json.JsonSerializer.Serialize(timeline);
            var value = JsonConvert.DeserializeObject<IEnumerable<TweetDto>>(jsonString);

            var tweets = await this.addLikedAndFilterBlockTweet(User.GetUserId(), value, true);

            var totallCount = await _unitOfWork.TweetRepository.UserTimeLineCount(User.GetUserId());

            var pagedResponse = new PagedResponse<IEnumerable<TweetDto>>(tweets, _filter.PageNumber, _filter.PageSize, totallCount);

            return Ok(pagedResponse);
        }


        [HttpGet]
        [Route("tweets/{userId}")]
        [Cached(60)]
        public async Task<IActionResult> GetTweets([FromRoute] String userId, [FromQuery] PaginationFilter filter)
        {
            if (!await _unitOfWork.UserRepository.ExistsAsync(filter => filter.id == userId && filter.isBlock == false))
                return NotFound("user_not_found");


            if ( await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.BlockId == userId)   
            
                || 

                await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == userId && filter.BlockId == User.GetUserId())

            ) return StatusCode(403, "user_blocked");



            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            Expression<Func<Tweet, Object>> sortByCreateDate = (s) => s.CreatedAt;
           
            var myTweets = await _unitOfWork.TweetRepository.FindManyAsync(filter => filter.UserId == userId, sortByCreateDate, _filter.PageNumber, _filter.PageSize);

            var tweetList = await this.addLikedAndFilterBlockTweet(userId, _mapper.Map<IEnumerable<TweetDto>>(myTweets), false);

            var totallCount = await _unitOfWork.TweetRepository.CountAsync(x => x.UserId == userId);


            var pagedResponse = new PagedResponse<IEnumerable<Object>>(tweetList, _filter.PageNumber, _filter.PageSize, totallCount);
            return Ok(pagedResponse);
        }

       
        
       

        [HttpPost]
        public async Task<IActionResult> CreateTweet(CreateTweetDto createTweet)
        {
            if (!ModelState.IsValid)
                return BadRequest(new Response<String>("Wrong Formate"));

            var userId = User.GetUserId();

            var tweet = _mapper.Map<Tweet>(createTweet);
            tweet.UserId = User.GetUserId();

            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == userId);
            user.TotalTweets++;

            _unitOfWork.UserRepository.ReplaceOneAsync(userId, user);

            _unitOfWork.TweetRepository.InsertOneAsync(tweet);

            await _redisService.DeleteAllkeysAsnyc();


            return await _unitOfWork.Commit() ? Ok(new Response<string>("Published")) : BadRequest(new Response<string>("Error to create tweet"));
        }


        [HttpPost]
        [Route("{tweetId}")]
        public async Task<IActionResult> RetweetPost([FromRoute] string tweetId)
        {
            if (!await _unitOfWork.TweetRepository.ExistsAsync(filter => filter.id == tweetId)) return NotFound();

            var userId = User.GetUserId();

            var retweet = new Tweet
            {
                IsRetweet = true,
                Content = tweetId,
                UserId = userId,
            };

            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == userId);
            user.TotalTweets++;
            _unitOfWork.UserRepository.ReplaceOneAsync(userId, user);


            var tweet = await _unitOfWork.TweetRepository.FindOneAsync(filter => filter.id == tweetId);
            tweet.TotalRetweets++;
            _unitOfWork.TweetRepository.ReplaceOneAsync(tweetId, tweet);


            var notification = new Notification
            {
                To = await _unitOfWork.TweetRepository.FilterOneAsync(filter => filter.id == tweetId, projectionExpression: filter => filter.UserId),
                From = user.id,
                FullName = user.FullName,
                PostId = tweetId,
                Type = "RETWEET"
            };

            if (notification.To != notification.From)
                await _notificationPublish.publish(notification);

            _unitOfWork.TweetRepository.InsertOneAsync(retweet);
            _unitOfWork.NotificationRepository.InsertOneAsync(notification);

            await _redisService.DeleteAllkeysAsnyc();

            return await _unitOfWork.Commit() ? Ok(new Response<string>("Retweeted")) : BadRequest(new Response<string>("Error to retweet"));
        }


        [HttpPut]
        [Route("{tweetId}")]
        public async Task<IActionResult> EditPost([FromRoute] string tweetId, CreateTweetDto editTweet)
        {
            if (!await _unitOfWork.TweetRepository.ExistsAsync(filter => filter.id == tweetId && filter.UserId == User.GetUserId())) return NotFound();

            var tweet = await _unitOfWork.TweetRepository.FindOneAsync(filter => filter.id == tweetId);
           
            tweet.Content = editTweet.Content;
            tweet.HashTag = editTweet.HashTag;

            _unitOfWork.TweetRepository.ReplaceOneAsync(tweetId, tweet);

            await _redisService.DeleteAllkeysAsnyc();

            return await _unitOfWork.Commit() ? Ok(new Response<string>("Ok")) : BadRequest();
        }



        [HttpDelete]
        [Route("{tweetId}")]
        public async Task<IActionResult> DeleteTweet([FromRoute] string tweetId)
        {
            var tweet = await _unitOfWork.TweetRepository.FindOneAsync(x => x.id == tweetId && x.UserId == User.GetUserId());

            if (tweet == null) return BadRequest(new Response<string>("U can't delete other's tweet"));

            var user = await _unitOfWork.UserRepository.FindOneAsync(filter => filter.id == User.GetUserId());
            user.TotalTweets--;


            _unitOfWork.UserRepository.ReplaceOneAsync(user.id, user);
            _unitOfWork.TweetRepository.DeleteManyAsync(x => x.Content == tweetId);
            _unitOfWork.TweetRepository.DeleteOneAsync(x => x.id == tweetId);
            _unitOfWork.LikeRepository.DeleteManyAsync(x => x.TweetId == tweetId);
            _unitOfWork.CommentRepository.DeleteManyAsync(x => x.TweetId == tweetId);
            _unitOfWork.NotificationRepository.DeleteManyAsync(x => x.PostId == tweetId);

            await _redisService.DeleteAllkeysAsnyc();

            return await _unitOfWork.Commit() ? Ok(new Response<string>("Deleted Post sucessfully")) : BadRequest(new Response<string>("Error while delete"));
        }


        private async Task<IEnumerable<TweetDto>> addLikedAndFilterBlockTweet(string userId, IEnumerable<TweetDto> tweets, bool isTimeLine)
        {
            string? FullName = (isTimeLine) ? null : (userId == User.GetUserId()) ? User.GetFullName() :  await _unitOfWork.UserRepository.FilterOneAsync(filter => filter.id == userId, projectionExpression: filter => filter.FullName);

            string? UserName = (isTimeLine) ? null:  (userId == User.GetUserId()) ? User.GetUserName() :  await _unitOfWork.UserRepository.FilterOneAsync(filter => filter.id == userId, projectionExpression: filter => filter.UserName);


            var tweetList = new List<TweetDto>();
            foreach (var tweet in tweets)
            {
                var _tweet = _mapper.Map<TweetDto>(tweet);

                if(!isTimeLine) _tweet.FullName = FullName;
                if(!isTimeLine) _tweet.UserName = UserName;

                _tweet.isLiked = await _unitOfWork.LikeRepository.ExistsAsync(filter => filter.UserId == User.GetUserId() && filter.TweetId == tweet.id);
                

                if (_tweet.IsRetweet)
                {
                    
                    
                    var retweet = await _unitOfWork.TweetRepository.FindOneAsync(filter => filter.id == _tweet.Content);
                    if (

                        retweet != null 

                        && 

                        !await _unitOfWork.AdminBlockRepository.ExistsAsync(filter => filter.UserId == retweet.UserId)


                        && 
                        
                        !await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == userId && filter.BlockId == retweet.UserId) 
                        
                        && 

                        !await _unitOfWork.UserBlockRepository.ExistsAsync(filter => filter.UserId == retweet.UserId && filter.BlockId == userId)
                    )
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
