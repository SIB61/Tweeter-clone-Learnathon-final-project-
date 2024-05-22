using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
    public class UBlock : IEntityBase
    {

        public DateTime CreatedAt {get;protected set;} = DateTime.Now; 


        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]    
        public string id { get; set; }
        
        [BsonElement("userId"), BsonRepresentation(BsonType.ObjectId)]
        public string UserId {get; set;} = null!;

        [BsonElement("blockId"), BsonRepresentation(BsonType.ObjectId)]
        public string BlockId {get; set;} = null!;
    }
}