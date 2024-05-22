using System.Linq.Expressions;

namespace core.Interfaces
{
    public interface IRepository<TEntity> : IDisposable where TEntity : class
    {
        IQueryable<TEntity> AsQueryable();
        Task<IEnumerable<TEntity>> FilterBy(
            Expression<Func<TEntity, bool>> filterExpression);

        IEnumerable<TProjected> FilterBy<TProjected>(
            Expression<Func<TEntity, bool>> filterExpression,
            Expression<Func<TEntity, TProjected>> projectionExpression);
     
        Task<TProjected> FilterOneAsync<TProjected>(
            Expression<Func<TEntity, bool>> filterExpression,
            Expression<Func<TEntity, TProjected>> projectionExpression);
     
    
        


        Task<TEntity> FindOneAsync(Expression<Func<TEntity, bool>> filterExpression);
        Task<IEnumerable<TEntity>> FindManyAsync(Expression<Func<TEntity, bool>> filterExpression, Expression<Func<TEntity, Object>> OrderByDescending, int PageNumber, int PageSize);

        Task<TEntity> FindByIdAsync(string id);
        
        Task<int> CountAsync(Expression<Func<TEntity, bool>> filterExpression);
        Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> filterExpression);



        Task InsertOne(TEntity document);
        void InsertOneAsync(TEntity document);
        void InsertManyAsync(ICollection<TEntity> documents);


        void ReplaceOneAsync(string id, TEntity document);


        void DeleteOneAsync(Expression<Func<TEntity, bool>> filterExpression);
        void DeleteByIdAsync(string id);
        void DeleteManyAsync(Expression<Func<TEntity, bool>> filterExpression);

       
    }
}