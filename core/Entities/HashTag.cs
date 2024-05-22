using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
    public class HashTag : IEntityBase
    {
         [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]    
        public string id { get; set; }
        public DateTime CreatedAt {get; set;} = DateTime.Now;
        public string hashTag {get; set;} =  null!;
        public int Count {get; set;}
    }
}