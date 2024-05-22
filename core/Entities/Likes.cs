using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
     [Serializable]
    public class Likes : IEntityBase
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]    
        public string id {get; set;} 
        public DateTime CreatedAt {get;protected set;} = DateTime.Now; 

        [BsonElement("tweetId"), BsonRepresentation(BsonType.ObjectId)]    
        public string TweetId {get; set;} = null!;

        [BsonElement("userId"), BsonRepresentation(BsonType.ObjectId)]    
        public string UserId {get; set;} = null!;
    }
}