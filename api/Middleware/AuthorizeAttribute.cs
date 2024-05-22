using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helper;
using core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace api.Middleware
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var block =  (AdminBlock)context.HttpContext.Items["block"];
            if(block != null) 
            {
                context.Result = new JsonResult( "admin_block") 
                { 
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
            

            var user = context.HttpContext.Items["userId"];
            
            if (user == null) {
                context.Result = new JsonResult(
                    "Unauthorized"
                ) {
                    StatusCode = StatusCodes.Status401Unauthorized
                };
            }
        }
    }
}
    
