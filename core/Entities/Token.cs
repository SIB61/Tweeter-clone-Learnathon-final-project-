using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
    public class Token : IEntityBase
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]    
        [BsonIgnoreIfDefault]
        public string id {get; set;} 

        [BsonElement("expireAt")]
        public DateTime CreatedAt {get;protected set;} = DateTime.Now.AddDays(7);
        public string RefreshToken {get; set;} = null!;
        public string UToken {get; set;} = null!;
        public DateTime ExpiredTime {get; set;} 
    }
}