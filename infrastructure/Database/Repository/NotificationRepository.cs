using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Entities;
using core.Interfaces;
using MongoDB.Driver;

namespace infrastructure.Database.Repository
{
    public class NotificationRepository : Repository<Notification>, INotificationRepository
    {
        public NotificationRepository(IMongoContext context) : base(context)
        {
        }


        public void UpdateBlockAttribute(string to, string from, bool flag)
        {
            var update = Builders<Notification>.Update.Set( filter => filter.IsBlock, flag);
            Context.AddCommand( () => 
                DbSet.UpdateManyAsync( (x => x.To == to && x.From == from) ,
                update, 
                new UpdateOptions{IsUpsert = false}));
        }
    }
}