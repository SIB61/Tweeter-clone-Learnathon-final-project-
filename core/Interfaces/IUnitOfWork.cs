using core.Entities;

namespace core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<Comments> CommentRepository {get;}
        IRepository<Follow> FollowRepository{get;}
        IRepository<Likes> LikeRepository{get;}
        IRepository<Token> TokenRepository {get;}               
        IRepository<AdminBlock> AdminBlockRepository {get;}
        IRepository<UBlock> UserBlockRepository{get;}

        IAppUserRepository UserRepository{get;}
        ITweetRepository TweetRepository {get;}
        INotificationRepository NotificationRepository{get;}



        Task<bool> Commit();
    }
}