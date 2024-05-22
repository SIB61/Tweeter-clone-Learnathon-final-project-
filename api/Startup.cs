
using api.Extensions;
using api.Helpers;
using api.Middleware;
using core.Entities;
using core.Interfaces.RabbitMQ;
using infrastructure.Services.SignalR;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        
        public void ConfigureServices(IServiceCollection services)
        {
           
            services.AddApplicationServices(Configuration);
            services.AddDatabaseServices(Configuration);        
            services.AddIdentityServices(Configuration);
            services.AddCacheServices(Configuration);
            services.AddRabbitMQServices(Configuration);
            services.AddSwaggerService();
            services.AddOptions();

            services.AddSignalR();

            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowAnyOrigin();
                });
            });
            

            
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IHostApplicationLifetime lifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }

            app.UseMiddleware<ErrorHandlerMiddleware>();
            app.UseMiddleware<JwtMiddleware>();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

             app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<NotificationHub>("hubs/notification");
                endpoints.MapHub<CommentHub>("hubs/comment");
            });

            lifetime.ApplicationStarted.Register(() => RegisterSignalRWithRabbitMQ(app.ApplicationServices));
        }





         public void RegisterSignalRWithRabbitMQ(IServiceProvider serviceProvider)
        {
            try{

                var rabbitMQService1 = (IConsumer<Notification>?)serviceProvider.GetService(typeof(IConsumer<Notification>));
                if(rabbitMQService1 != null) rabbitMQService1.Connect();

                var rabbitMQService2 = (IConsumer<Comments>?)serviceProvider.GetService(typeof(IConsumer<Comments>));
                if(rabbitMQService2 != null) rabbitMQService2.Connect();


            }catch(Exception e)
            {
                Console.WriteLine( "Problem\n" +  e);
            }
            
        }
        
    }
}

