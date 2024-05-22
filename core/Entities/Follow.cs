
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
    public class Follow : IEntityBase
    {
        [BsonId, BsonElement("_id"), BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]     
        public string id { get;set;}
        public DateTime CreatedAt {get; set;} = DateTime.Now;

        [BsonElement("userId"), BsonRepresentation(BsonType.ObjectId)]
        public string UserId {get; set;} = null!;
        
        [BsonElement("follwingID"), BsonRepresentation(BsonType.ObjectId)]
        public string Following {get; set;} = null!;
    }
}