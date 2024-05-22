using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
    public class Notification : IEntityBase
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]     
        public String id {get; set;}
        public DateTime CreatedAt {get; set;} = DateTime.Now;

        [BsonElement("To"), BsonRepresentation(BsonType.ObjectId)]
        public String To {get;  set;}

        [BsonElement("From"), BsonRepresentation(BsonType.ObjectId)]

        public String From {get; set;}
        public String FullName {get; set;}
        public String? PostId {get; set;}
        public String Type {get; set;} = null!;
        public Boolean IsRead {get; set;} = false;
        public Boolean IsBlock {get; set;} = false;
    }
}