using System.Linq.Expressions;
using core.Entities;
using core.Interfaces;
using MongoDB.Driver;

namespace infrastructure.Database.Repository
{
    public class TweetRepository : Repository<Tweet>, ITweetRepository
    {
        private readonly IMongoCollection<Tweet> _tweet;
        private readonly IMongoCollection<Likes> _likes;
        private readonly IMongoCollection<Comments> _comments;
        private readonly IMongoCollection<Follow> _follow;
        private readonly IMongoCollection<HashTag> _hashTag;
        private readonly IMongoCollection<AppUser> _user;

        public TweetRepository(IMongoContext context) : base(context)
        {
            this._tweet = base.Context.GetCollection<Tweet>((typeof(Tweet).Name));
            this._likes  = base.Context.GetCollection<Likes>((typeof(Likes).Name));
            this._comments = base.Context.GetCollection<Comments>((typeof(Comments).Name));
            this._follow = base.Context.GetCollection<Follow>((typeof(Follow).Name));
            this._hashTag = base.Context.GetCollection<HashTag>((typeof(HashTag).Name));
            this._user = base.Context.GetCollection<AppUser>((typeof(AppUser)).Name);
        }


        public async Task<int> HashTagPostCount(string hashTag)
        {
           return (int)await DbSet.Find(Builders<Tweet>.Filter.Text(hashTag)).CountAsync();
        }


        public async Task<IEnumerable<Tweet>> SearchTweet(string hashTag, int pageNumber, int pageSize)
        {
            var result = await DbSet.Find(Builders<Tweet>.Filter.Text(hashTag))
                .SortByDescending(x => x.CreatedAt)
                .Limit(pageSize)
                .Skip((pageNumber-1)*pageSize)
                .ToListAsync();
            
            return result;
        }

        public async Task<Object> UserTimeLine(string userId, int pageNumber, int pageSize)
        {
            
           var result = (from t in _tweet.AsQueryable()
                join follow in _follow.AsQueryable()
                on t.UserId equals follow.Following 
                join user in _user.AsQueryable()
                on t.UserId equals user.id 
                where(follow.UserId == userId && user.isBlock == false)
                orderby(t.CreatedAt) descending
                select new 
                {
                    id = t.id,
                    CreatedAt = t.CreatedAt,
                    UserId = t.UserId,
                    FullName = user.FullName,
                    UserName = user.UserName,
                    Content = t.Content,
                    HashTag = t.HashTag,
                    TotalLikes =  t.TotalLikes,
                    TotalComments =  t.TotalComments,
                    TotalRetweets =  t.TotalRetweets,
                    IsRetweet = t.IsRetweet
                })
                .Skip((pageNumber-1)*pageSize)
                .Take(pageSize);

            return result;
        }

      
        public async Task<int> UserTimeLineCount(string userId)
        {
            var count =   (from t in _tweet.AsQueryable() 
                    join f in _follow.AsQueryable()
                    on t.UserId equals f.Following 
                    join user in _user.AsQueryable()
                    on t.UserId equals user.id
                    where(f.UserId == userId  && user.isBlock == false)
                    select new {
                        x = t.id
                    }).Count();

            Console.WriteLine(count);

            return count;
        }
    }
}