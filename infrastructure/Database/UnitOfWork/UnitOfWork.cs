using core.Entities;
using core.Interfaces;
using infrastructure.Database.Repository;


namespace infrastructure.Database.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMongoContext _context;
        public UnitOfWork(IMongoContext context)
        {
            _context = context;
        }
        

        public IRepository<Comments> CommentRepository => new Repository<Comments>(_context);
        public IRepository<Follow> FollowRepository => new Repository<Follow>(_context);
        public IRepository<Likes> LikeRepository => new Repository<Likes>(_context);
        public IRepository<AdminBlock> AdminBlockRepository => new Repository<AdminBlock>(_context);
        public IRepository<UBlock> UserBlockRepository => new Repository<UBlock>(_context);
        public IRepository<Token> TokenRepository => new Repository<Token>(_context);
        public IAppUserRepository UserRepository => new AppUserRepository(_context);
        public ITweetRepository TweetRepository => new TweetRepository(_context);
        public INotificationRepository NotificationRepository => new NotificationRepository(_context);

        public async Task<bool> Commit()
        {
            var change = await _context.SaveChanges();
            return change > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}