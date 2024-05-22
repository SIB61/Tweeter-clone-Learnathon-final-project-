
using System.Linq.Expressions;
using api.Cache;
using api.Helper;
using api.Middleware;
using api.Cache;
using api.Helper;
using api.Middleware;
using core.Entities;
using core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using core.Interfaces.Redis;

namespace api.Controllers.Users
{
    [ApiController]
    [Route("[Controller]")]
    [Authorize]
    public class NotificationController : ControllerBase
    {   
        private readonly IUnitOfWork _unitOfWork; 
        private readonly IRedisService _redisService;
        public NotificationController(IUnitOfWork unitOfWork, IRedisService redisService)
        {
            _unitOfWork = unitOfWork;
            _redisService = redisService;
        }

        [HttpGet]
        [Cached(60)]
        public async Task<IActionResult> GetNotifications([FromQuery]PaginationFilter filter)
        {
            var _filter = new PaginationFilter(filter.PageNumber, filter.PageSize);

            Expression<Func<Notification, Object>> sortByDecendingCreateTime = (filter) => filter.CreatedAt;

            var notifications = await _unitOfWork.NotificationRepository.FindManyAsync(filter => filter.To == User.GetUserId() && filter.IsBlock == false, sortByDecendingCreateTime, _filter.PageNumber, _filter.PageSize);
     
            var totalNotification =await _unitOfWork.NotificationRepository.CountAsync(filter => filter.To == User.GetUserId() && filter.IsBlock == false);

            

            var pagedResponse = new PagedResponse<IEnumerable<Notification>>(notifications, _filter.PageNumber, _filter.PageSize, totalNotification);
            return Ok(pagedResponse);
        }


        [HttpGet]
        [Route("unread-notification")]
        public async Task<IActionResult> UnreadNotificationCount()
        {
            var unreadNotificationCount = await _unitOfWork.NotificationRepository.CountAsync(filter => filter.To == User.GetUserId() && filter.IsRead == false);
            return Ok(new Response<int>(unreadNotificationCount));
        }

        [HttpPost]
        public async Task<IActionResult> ChangeNotificationStatus(string notificationId)
        {

            if(!await _unitOfWork.NotificationRepository.ExistsAsync(filter => filter.id == notificationId && filter.To == User.GetUserId()))
                return Unauthorized(new Response<string>("You Can't modify other user's notification"));

            
            var notification = await _unitOfWork.NotificationRepository.FindOneAsync(filter => filter.id == notificationId);
            notification.IsRead = true;

            _unitOfWork.NotificationRepository.ReplaceOneAsync(notificationId, notification);
            
            return await _unitOfWork.Commit() ? Ok(new Response<string>("Notification Read")) : BadRequest(new Response<string>("Notification Read Error"));
        }
    }
}