using Microsoft.OpenApi.Models;

namespace api.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerService(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
                        {
                            c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
                            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                            {
                                Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                                            Enter 'Bearer' [space] and then your token in the text input below.
                                            \r\n\r\nExample: 'Bearer 12345abcdef'",
                                Name = "Authorization",
                                In = ParameterLocation.Header,
                                Type = SecuritySchemeType.ApiKey,
                                Scheme = "Bearer"
                            });
                            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                            {
                                {
                                new OpenApiSecurityScheme
                                {
                                    Reference = new OpenApiReference
                                    {
                                        Type = ReferenceType.SecurityScheme,
                                        Id = "Bearer"
                                    },
                                    Scheme = "oauth2",
                                    Name = "Bearer",
                                    In = ParameterLocation.Header,

                                    },
                                    new List<string>()
                                }
                                });

            });
            return services;
        }
    }
}