
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
    [Serializable]
    public class AppUser : IEntityBase
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]
        [BsonIgnoreIfDefault]
        public string id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;

        public int Gender { get; set; }

        public DateTime DateOfBirth { get; set; }
        public byte[] PasswordSalt { get; set; } = null!;
        public byte[] PasswordHash { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public Boolean isBlock { get; set; } = false;
        public string Role { get; set; } = "User";

        public int TotalFollowers { get; set; }
        public int TotalFollowings { get; set; }
        public int TotalTweets { get; set; }
    }
}