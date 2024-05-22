using System.Security.Claims;
using core.Entities;

namespace core.Interfaces
{
    public interface ITokenService
    {
        Tuple<String, DateTime> CreateToken(AppUser user);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
        Tuple<String,DateTime> CreateToken(List<Claim> authClaims);
    }
}