using System.Text;
using core.Entities.ServiceEntities;
using core.Interfaces;
using infrastructure.Services.Token;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace api.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration _config)
        {
            
            services.Configure<TokenSettings>(_config.GetSection("JWT"));
            services.AddScoped<ITokenService, TokenService>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(
                            options => {
                                options.SaveToken = true;
                                options.RequireHttpsMetadata = false;
                                options.TokenValidationParameters = new TokenValidationParameters()
                                {
                                    ValidateIssuer = true,
                                    ValidateAudience = false,
                                    ValidateLifetime = true,
                                    ValidateIssuerSigningKey = true,
                                    ClockSkew = TimeSpan.Zero,

                                    ValidAudience = _config["JWT:ValidAudience"],
                                    ValidIssuer = _config["JWT:ValidIssuer"],
                                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]))
                                };

                                options.Events = new JwtBearerEvents{
                                    OnMessageReceived = context => {
                                        var access_token = context.Request.Query["access_token"];
                                        var path = context.HttpContext.Request.Path;

                                        if(!string.IsNullOrEmpty(access_token) && path.StartsWithSegments("/hubs")){
                                            context.Token = access_token;
                                        }
                                        
                                        return Task.CompletedTask;
                                    }
                                };
                            }

                            
                        
                        );

            return services;
        }
    }
}