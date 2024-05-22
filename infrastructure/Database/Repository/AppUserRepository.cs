using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using core.Entities;
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;

namespace infrastructure.Database.Repository
{
    public class AppUserRepository : Repository<AppUser>, IAppUserRepository
    {
        private readonly IMongoCollection<Follow> _follow;
        private readonly IMongoCollection<AppUser> _user;
        private readonly IMongoCollection<Notification> _notification;
     
        public AppUserRepository(IMongoContext context) : base(context)
        {
            this._follow = base.Context.GetCollection<Follow>((typeof(Follow).Name));
            this._user = base.Context.GetCollection<AppUser>(typeof(AppUser).Name);
            this._notification = base.Context.GetCollection<Notification>(typeof(Notification).Name);


          
        }

    

    
      
        public async Task<IEnumerable<AppUser>> SearchingUsers(string UserName, int pageNumber, int pageSize)
        {
            var filterBuilder = Builders<AppUser>.Filter;
            var filter = filterBuilder.Text(UserName) 
                 & filterBuilder.Eq("isBlock", false);

            var users = await DbSet.Find(filter)
                .Skip((pageNumber-1)*pageSize)
                .Limit(pageSize)
                .ToListAsync();
            return users;
        }

        
        public async  Task<IEnumerable<Follow>> Follwer(string userId, int pageNumber, int pageSize)
        {
            var result = await _follow.Find( x=> x.Following == userId)
                .SortByDescending(x => x.CreatedAt)
                .Skip((pageNumber-1)*pageSize)
                .Limit(pageSize)
                .ToListAsync();
            return result;
        }

        

        public async Task<int> SearchingUsersCountAsync(string userName)
        {
            var filterBuilder = Builders<AppUser>.Filter;
            var filter = filterBuilder.Text(userName) 
                 & filterBuilder.Eq("isBlock", false);

            var count = (int)await DbSet.Find(filter).CountAsync();
            return count;
        }


        // public async Task<AppUser> GetTopUsers(string userId, int pageNumber ,int pageSize)
        // {

        //     BsonDocument pipelineStage1 = new BsonDocument{
        //         {
        //             "$match", new BsonDocument{
        //                 { "_id", false}
        //             }
        //         }
        //     };
        //     var query = _user.AsQueryable();

        //      var filterBuilder = Builders<Follow>.Filter;
        //     var filter =  filterBuilder.Eq("userId", userId);

        //     query = (MongoDB.Driver.Linq.IMongoQueryable<AppUser>)query.Where(filter => filter.isBlock == true);

        //     query = 
        // }

    }
}