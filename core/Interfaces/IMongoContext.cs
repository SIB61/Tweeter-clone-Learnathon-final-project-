using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace core.Interfaces
{
    public interface IMongoContext : IDisposable
    {
        void AddCommand(Func<Task> func);
        Task<int> SaveChanges();
        IMongoCollection<T> GetCollection<T>(string name);
    }
}