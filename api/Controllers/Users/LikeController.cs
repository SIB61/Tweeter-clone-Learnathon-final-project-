using api.Helper;
using api.Middleware;
using core.Entities;
using core.Interfaces;
using core.Interfaces.RabbitMQ;
using core.Interfaces.Redis;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Users
{
    [Authorize]
    [Route("like")]
    public class LikeController : ApiBaseController
    {
        private readonly IPublish<Notification> _notificationPublish;
       
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRedisService _redisService;
        public LikeController(IPublish<Notification> notificationPublish, IUnitOfWork unitOfWork, IRedisService redisService)
        {
            _unitOfWork = unitOfWork;
            _notificationPublish = notificationPublish;

            _redisService = redisService;
        }

        

        [HttpPost("{postId}")]
        public async Task<IActionResult> LikeOnTweet([FromRoute]string postId)
        {
            if(await _unitOfWork.LikeRepository.ExistsAsync(filter => filter.TweetId == postId && filter.UserId == User.GetUserId()))
                return BadRequest(new Response<string>("Already Liked"));


            var like = new Likes
            {
                UserId = User.GetUserId(),
                TweetId = postId
            };

            


            var tweet = await _unitOfWork.TweetRepository.FindOneAsync(filter => filter.id == postId);
            tweet.TotalLikes++;


            var notification = new Notification
            {
                To = tweet.UserId,
                From = User.GetUserId(),
                FullName = User.GetFullName(),
                PostId = postId,
                Type = "LIKE"
            };
            


            if(notification.To != notification.From)
                await _notificationPublish.publish(notification);


            _unitOfWork.TweetRepository.ReplaceOneAsync(tweet.id, tweet);
            _unitOfWork.LikeRepository.InsertOneAsync(like);
            _unitOfWork.NotificationRepository.InsertOneAsync(notification);


            await _redisService.DeleteAllkeysAsnyc();

            return await _unitOfWork.Commit() ?  Ok(new Response<string>("Liked")): BadRequest(new Response<string>("Error"));
        }


        [HttpDelete("{postId}")]
        public async Task<IActionResult> RemoveLike([FromRoute]string postId)
        {

            var liked =await _unitOfWork.LikeRepository.FindOneAsync( filter => filter.TweetId == postId  && filter.UserId == User.GetUserId());

            if(liked == null) return BadRequest("Liked By other user!");

            var tweet = await _unitOfWork.TweetRepository.FindOneAsync(filter => filter.id == postId);
            tweet.TotalLikes--;
           
            _unitOfWork.TweetRepository.ReplaceOneAsync(tweet.id, tweet);
            
            _unitOfWork.LikeRepository.DeleteOneAsync( filter => filter.TweetId == postId && filter.UserId == User.GetUserId());


            await _redisService.DeleteAllkeysAsnyc();
            
            return await _unitOfWork.Commit() ? Ok(new Response<string>("Ok")) : BadRequest(new Response<string>("Error"));
        }
    }
}
