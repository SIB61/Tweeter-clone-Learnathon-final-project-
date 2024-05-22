
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace core.Entities
{
     [Serializable]
    public class AdminBlock : IEntityBase
    {
        public AdminBlock(string userId){
            this.UserId = userId;
        }

        [BsonId, BsonElement("_id"), BsonRepresentation(BsonType.ObjectId)]    
        public string id { get; set; }
        public DateTime CreatedAt {get;protected set;} = DateTime.Now; 

        [BsonElement("userId"), BsonRepresentation(BsonType.ObjectId)]
        public string UserId {get; set;} = null!;
    }


    

}