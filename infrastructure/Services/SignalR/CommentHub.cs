using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace infrastructure.Services.SignalR
{

    [Authorize]
    public class CommentHub  : Hub
    {
         public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var postId = httpContext?.Request.Query["postId"].ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, postId);
        }

        
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await base.OnDisconnectedAsync(exception);
        }
    }
}