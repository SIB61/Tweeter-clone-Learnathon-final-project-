using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace infrastructure.Services.SignalR
{
    [Authorize]
    public class NotificationHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var userId = httpContext?.Request.Query["userId"].ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, userId);
        }

        
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}