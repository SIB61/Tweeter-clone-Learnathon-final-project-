
using core.Entities.ServiceEntities;
using core.Interfaces.Redis;
using Microsoft.Extensions.Options;
using StackExchange.Redis;

namespace infrastructure.Services.Redis
{
    public class RedisService : IRedisService
    {
        private readonly IDatabase _database;
        private readonly IOptions<RedisCacheSetting> _redisCachettings;
        private readonly IConnectionMultiplexer _connection;

        public RedisService(IOptions<RedisCacheSetting> redisCacheSetting)
        {
            _redisCachettings = redisCacheSetting;
            _connection = ConnectionMultiplexer.Connect(_redisCachettings.Value.ConnectionString);
            _database = _connection.GetDatabase();
        }

        public async Task<bool> DeleteAsync(string key)
        {
            return await _database.KeyDeleteAsync(key);
        }

        public async Task<string> GetAsync(string key)
        {
            var data = await _database.StringGetAsync(key);
            return data;
        }

      

        public async Task SetAsync(string key, string value, TimeSpan timeTimeLive)
        {
            if(value == null) return ;
            var created = await _database.StringSetAsync(key , value, timeTimeLive);
            return ;
        }

        public async Task DeleteAllkeysAsnyc()
        {
            try{
                var ok = _redisCachettings;
                var endpoints = _connection.GetEndPoints(true);
                foreach(var endpoint in endpoints){
                    var server = _connection.GetServer(endpoint);
                    await server.FlushAllDatabasesAsync();
                }
            }
            catch{

            }
        }
    }
}