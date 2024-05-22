
using System.Linq.Expressions;
using core.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;


namespace infrastructure.Database.Repository
{
    public  class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        public readonly IMongoContext Context;
        public readonly IMongoCollection<TEntity> DbSet;
        public Repository(IMongoContext context)
        {
            Context = context;
            DbSet = Context.GetCollection<TEntity>(typeof(TEntity).Name);
        }

        public IQueryable<TEntity> AsQueryable()
        {
            return DbSet.AsQueryable();
        }

        public virtual Task<IEnumerable<TEntity>> FilterBy(Expression<Func<TEntity, bool>> filterExpression)
        {
            return Task.Run(()=>{
                return DbSet.Find(filterExpression).ToEnumerable();
            });
        }

        public virtual  IEnumerable<TProjected> FilterBy<TProjected>(Expression<Func<TEntity, bool>> filterExpression,
         Expression<Func<TEntity, TProjected>> projectionExpression)
        {
            return DbSet.Find(filterExpression).Project(projectionExpression).ToEnumerable();
        }

        public virtual Task<TEntity> FindByIdAsync(string id)
        {
            return Task.Run(()=>{
                var objectId = new ObjectId(id);
                var filer = Builders<TEntity>.Filter.Eq("_id", id);
                return DbSet.Find(filer).SingleOrDefaultAsync();
            });
        }

        public virtual Task<TEntity> FindOneAsync(Expression<Func<TEntity, bool>> filterExpression)
        {
            return Task.Run( ()=> DbSet.Find(filterExpression).FirstOrDefaultAsync());
        }

        public virtual void InsertOneAsync(TEntity document)
        {
            Context.AddCommand( ()=> DbSet.InsertOneAsync(document));
        }

        public virtual void InsertManyAsync(ICollection<TEntity> documents)
        {
            Context.AddCommand( ()=> DbSet.InsertManyAsync(documents));
        }
      
        public virtual void ReplaceOneAsync(string id, TEntity document)
        {
            var filter = Builders<TEntity>.Filter.Eq("_id", new ObjectId(id));
            Context.AddCommand( ()=> DbSet.ReplaceOneAsync(filter, document));
        }

        
       
        public virtual void DeleteByIdAsync(string id)
        {
            Context.AddCommand( ()=> DbSet.FindOneAndDeleteAsync(Builders<TEntity>.Filter.Eq("_id", new ObjectId(id))));
        }

        public virtual void DeleteManyAsync(Expression<Func<TEntity, bool>> filterExpression)
        {
            Context.AddCommand( ()=> DbSet.DeleteManyAsync(filterExpression));
        }

        public  virtual void DeleteOneAsync(Expression<Func<TEntity, bool>> filterExpression)
        {
            Context.AddCommand( ()=> DbSet.FindOneAndDeleteAsync(filterExpression));
        }

        public void Dispose()
        {
            Context?.Dispose();
        }

        public async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> filterExpression)
        {
            return await Task.Run(()=> DbSet.Find(filterExpression).AnyAsync());
        }

       
        public async Task<int> CountAsync(Expression<Func<TEntity, bool>> filterExpression)
        {
            return (int)await DbSet.CountAsync(filterExpression);  
        }

        public async Task InsertOne(TEntity document)
        {
            await DbSet.InsertOneAsync(document);
        }

        public async Task<TProjected> FilterOneAsync<TProjected>(Expression<Func<TEntity, bool>> filterExpression, Expression<Func<TEntity, TProjected>> projectionExpression)
        {
           return await DbSet.Find(filterExpression).Project(projectionExpression).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<TEntity>> FindManyAsync(Expression<Func<TEntity, bool>> filterExpression, Expression<Func<TEntity, Object>> orderByDescending, int pageNumber, int pageSize)
        {
            return await DbSet.Find(filterExpression)
                  .Skip((pageNumber-1)*pageSize)
                  .Limit(pageSize)
                  .SortByDescending(orderByDescending)
                  .ToListAsync();
        }
    }
}