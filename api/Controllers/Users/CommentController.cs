
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
     [Route("comment")]
    public class CommentController : ApiBaseController
    {

        private readonly IPublish<Notification> _notificationPublish;
        private readonly IPublish<Comments> _commnetPublish;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        private readonly IRedisService _redisService;
      
        public CommentController(IPublish<Notification> notificationPublish, IPublish<Comments> commentPublish, IUnitOfWork unitOfWork, IMapper mapper, IRedisService redisService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _notificationPublish = notificationPublish;
            _commnetPublish = commentPublish;

            _redisService = redisService;
        }

        [HttpGet]
        [Cached(60)]
        public  async Task<IActionResult> Comments([FromQuery]string tweetId,  [FromQuery]PaginationFilter filter)
        {
            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            
            Expression<Func<Comments, Object>> sortByCreateDate = (s) => s.CreatedAt;
            


            var result = await _unitOfWork.CommentRepository.FindManyAsync( filter => filter.TweetId == tweetId,  sortByCreateDate,_filter.PageNumber, _filter.PageSize);

            var totallCount = await _unitOfWork.CommentRepository.CountAsync(filter => filter.TweetId == tweetId);
            
            var pagedResponse = new PagedResponse<IEnumerable<Comments>>(result, _filter.PageNumber, _filter.PageSize, totallCount);
            return Ok(pagedResponse);
        }


        [HttpPost]
        public async Task<IActionResult> CommentOnTweet(CommentDto commentDto)
        {
            var userId = User.GetUserId();
            var comment = new Comments{
                Content = commentDto.Content,
                TweetId = commentDto.TweetId,
                UserId = User.GetUserId(),
                FullName = User.GetFullName(),
                UserName = User.GetUserName()
            };
           

            var tweet = await _unitOfWork.TweetRepository.FindOneAsync(filter => filter.id == commentDto.TweetId);
            tweet.TotalComments++;
            _unitOfWork.TweetRepository.ReplaceOneAsync(commentDto.TweetId, tweet);



            var notification = new Notification
            {
                To = tweet.UserId,
                From = userId,
                FullName = User.GetFullName(),
                PostId = tweet.id,
                Type = "COMMENT"
            };


            _unitOfWork.CommentRepository.InsertOneAsync(comment);
            _unitOfWork.NotificationRepository.InsertOneAsync(notification);


            if(notification.To != notification.From) await _notificationPublish.publish(notification);
            
            await _commnetPublish.publish(comment);
            await _redisService.DeleteAllkeysAsnyc();
            
            return await _unitOfWork.Commit() ? Ok(new Response<string>("OK")) : BadRequest(new Response<String>("Failed To Comments"));
            
        }



        [HttpPut("update")]
        public async Task<IActionResult> UpdateCommants(CommentUD commentupdateDto)
        {
            var comment = await _unitOfWork.CommentRepository.FindOneAsync( filter => filter.id == commentupdateDto.CommentId && filter.UserId == User.GetUserId());
            comment.Content = commentupdateDto.Content;

            if(comment == null) return BadRequest(new Response<String>("U cann't Edit other's comment"));
            _unitOfWork.CommentRepository.ReplaceOneAsync(commentupdateDto.CommentId, comment);

            await _redisService.DeleteAllkeysAsnyc();
            return await _unitOfWork.Commit() ? Ok(new Response<string>("Comment Updated")) : BadRequest(new Response<string>("Error while update comments")); 
        }


        

        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeteleComment([FromRoute] string commentId)
        {

            var comment =await _unitOfWork.CommentRepository.FindOneAsync( filter => filter.id == commentId && filter.UserId == User.GetUserId());

            if(comment == null) return NotFound();

            _unitOfWork.CommentRepository.DeleteOneAsync(filter => filter.id == commentId && filter.UserId == User.GetUserId());
            var tweet = await _unitOfWork.TweetRepository.FindOneAsync(filter => filter.id == comment.TweetId);
            tweet.TotalComments--;
            _unitOfWork.TweetRepository.ReplaceOneAsync(comment.TweetId, tweet);

            await _redisService.DeleteAllkeysAsnyc();
            
            return await _unitOfWork.Commit() ? Ok(new Response<string>("Comment Deleted")) : BadRequest(new Response<string>("Error while delete")); 
        }
    }
}
