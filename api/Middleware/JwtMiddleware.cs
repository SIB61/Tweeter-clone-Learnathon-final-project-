using System.IdentityModel.Tokens.Jwt;
using System.Text;
using core.Entities;
using core.Entities.ServiceEntities;
using core.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace api.Middleware
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IOptions<TokenSettings> _appSettings;

        public JwtMiddleware(RequestDelegate next, IOptions<TokenSettings> appSettings)
        {
            _next = next;
            _appSettings = appSettings;
        }

        public async Task Invoke(HttpContext context, IRepository<AdminBlock> _blockRepository)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)
               context =  await attachAccountToContext(context, _blockRepository, token);

            await _next(context);
        }

        private async Task<HttpContext> attachAccountToContext(HttpContext context, IRepository<AdminBlock> _blockRepository , string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {

                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                   
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
               
                var accountId = (jwtToken.Claims.First(x => x.Type == "id").Value);
                var block = await _blockRepository.FindOneAsync(filter => filter.UserId == accountId);
                context.Items["block"] = block;     
                context.Items["userId"] = accountId;           
            }
            catch 
            {
              
            }
            return context;
        }
    }
}