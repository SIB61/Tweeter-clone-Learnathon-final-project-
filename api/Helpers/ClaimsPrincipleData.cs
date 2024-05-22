using System.Security.Claims;

namespace api.Helper
{
    public static class ClaimsPrincipleData
    {
        public static string GetUserName(this ClaimsPrincipal user){
            return user.FindFirst(ClaimTypes.Name).Value;
        }

        public static string GetUserId(this ClaimsPrincipal user)
         {
            return user.FindFirst(ClaimTypes.NameIdentifier).Value;
         }

        public static string GetFullName(this ClaimsPrincipal user)
        {
            return user.FindFirst(ClaimTypes.GivenName).Value;
        }
    
    }
}