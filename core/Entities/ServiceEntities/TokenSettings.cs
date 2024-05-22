

namespace core.Entities.ServiceEntities
{
    public class TokenSettings
    {
        public string ValidAudience {get; set;} = null!;
        public string ValidIssuer {get; set;} = null!;
        public string Secret {get; set;} = null!;
        public string TokenValidityInMinutes {get; set;} = null!;
        public string RefreshTokenValityInidDays {get; set;} = null!;
    }
}