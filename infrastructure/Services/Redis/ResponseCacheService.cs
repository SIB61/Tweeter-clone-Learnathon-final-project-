
using System.Text.Json;
using core.Entities.ServiceEntities;
using core.Interfaces.Redis;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace infrastructure.Services.Redis
{
    public class ResponseCacheService : IResponseCacheService
    {
        private readonly IDatabase _database;
        private readonly IOptions<RedisCacheSetting> _redisCachettings;
        private readonly IConnectionMultiplexer _connection;
        public ResponseCacheService(IOptions<RedisCacheSetting> redisCacheSetting)
        {
            _redisCachettings = redisCacheSetting;
            _connection = ConnectionMultiplexer.Connect(_redisCachettings.Value.ConnectionString);
            _database = _connection.GetDatabase();
        }


        public async Task CacheResponseAsync(string cacheKey, object response, TimeSpan timeTimeLive)
        {
            if(response == null) return ;

            JsonSerializerOptions options = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var serialzedResponse = System.Text.Json.JsonSerializer.Serialize(response, options);      
            await _database.StringSetAsync(cacheKey, serialzedResponse, timeTimeLive);
            return ;
        }

        public async Task<bool> DeleteAllkeysAsnyc()
        {
            
            var iServer = _connection.GetServer(_redisCachettings.Value.Host, _redisCachettings.Value.Port);
            await iServer.FlushAllDatabasesAsync();
            
            return true;
        }

        public async Task<string> GetCachedResponseAsync(string cacheKey)
        {
            var data = await _database.StringGetAsync(cacheKey);
            return data;
        }
    }
}