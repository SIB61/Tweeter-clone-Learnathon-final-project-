
namespace core.Entities.ServiceEntities
{
    public class RedisCacheSetting
    {
        public bool Enabled {get; set;}
        public string ConnectionString {get; set;} = null!;
        public string Host {get;set;} = null!;
        public string Port {get;set;} = null!;
    }
}