
using core.Interfaces;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using core.Entities;
using core.Entities.ServiceEntities;

namespace infrastructure.Database.StoreContext
{


    public class MongoContext : IMongoContext
    {
        private IMongoDatabase Database {get; set;}
        public IClientSessionHandle Session {get; set;}
        public MongoClient MongoClient {get; set;}
        private readonly List<Func<Task>> _commands;

        private readonly IOptions<DatabaseSettings> _databaseSettings;
        private readonly IMongoCollection<AppUser> _usesCollection;
        
        public MongoContext(IOptions<DatabaseSettings> databaseSettings)
        {
            MongoClient = new MongoClient(
                databaseSettings.Value.ConnectionString);

            Database = MongoClient.GetDatabase(
                databaseSettings.Value.DatabaseName);
            _databaseSettings = databaseSettings;
            _commands = new List<Func<Task>>();
        }
       
        public void AddCommand(Func<Task> func)
        {
            _commands.Add(func);
        }

        public void Dispose()
        {
            Session?.Dispose();
            GC.SuppressFinalize(this);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            this.ConfigureMongo();
            return Database.GetCollection<T>(name);
        }

        public async Task<int> SaveChanges()
        {
            this.ConfigureMongo();
            AutoResetEvent autoResetEvent = new AutoResetEvent(false);
            using var Session = await MongoClient.StartSessionAsync();
            try{
                Session.StartTransaction();
                var commandTasks = _commands.Select(c =>c());
                await Task.WhenAll(commandTasks);
                await Session.CommitTransactionAsync();
            }
            catch(Exception e)
            {
                await Session.AbortTransactionAsync();
                throw e;
            }

            return _commands.Count();
        }
    

        private void ConfigureMongo()
        {
            MongoClient = new MongoClient(_databaseSettings.Value.ConnectionString);

            Database = MongoClient.GetDatabase(_databaseSettings.Value.DatabaseName);

            Database.GetCollection<AppUser>((typeof(AppUser).Name)).Indexes.CreateOneAsync(Builders<AppUser>.IndexKeys.Text(x => x.FullName));
            Database.GetCollection<Tweet>((typeof(Tweet).Name)).Indexes.CreateOneAsync(Builders<Tweet>.IndexKeys.Text(x => x.HashTag));

            
            
            var indexKeysDefinition = Builders<Token>.IndexKeys.Ascending("expireAt");
            var indexOptions = new CreateIndexOptions { ExpireAfter = new TimeSpan(0, 0, 0)};
            var indexModel = new CreateIndexModel<Token>(indexKeysDefinition, indexOptions);
            Database.GetCollection<Token>((typeof(Token).Name)).Indexes.CreateOneAsync(indexModel);
        }
    
    }
}