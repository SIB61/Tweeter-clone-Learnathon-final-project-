using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
    public class ReTweet
    {
        [BsonElement("retweet-id"), BsonRepresentation(BsonType.ObjectId)]    
        public string id {get; set;} = null!; 
        public DateTime CreatedAt {get; set;}
        public string FullName {get; set;} 

        public ReTweet(string id, string fullName, DateTime createdAt)
        {
            this.id = id;
            this.CreatedAt = createdAt;
            this.FullName = fullName;
        }
        
    }   
}