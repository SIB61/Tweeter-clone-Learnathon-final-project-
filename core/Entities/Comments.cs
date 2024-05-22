using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities

{
     [Serializable]
    public class Comments : IEntityBase
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]    
        public string id {get; set;}
        public DateTime CreatedAt {get; set;} = DateTime.Now; 
        
        [BsonElement("tweetId"), BsonRepresentation(BsonType.ObjectId)]    
        public string TweetId {get; set;} = null!;
        

        [BsonElement("userId"), BsonRepresentation(BsonType.ObjectId)]    
        public string UserId {get; set;} = null!;
        public string FullName {get; set;} = null!;
        public string UserName {get; set;} = null!;
        public string Content {get; set;} = null!;
    }
}