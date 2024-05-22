using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
    [Serializable]
    public class Tweet : IEntityBase
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]    
        public string id {get; set;}
        public DateTime CreatedAt {get; set;} = DateTime.Now; 

        [BsonElement("userId"), BsonRepresentation(BsonType.ObjectId)]
        public string UserId {get; set;} = null!;
        public string Content {get; set;} = null!;
        public string? HashTag {get; set;} 
        public int TotalLikes {get; set;}
        public int TotalComments {get; set;}
        public int TotalRetweets {get; set;}
        public Boolean IsRetweet {get; set;} = false;
    }
}