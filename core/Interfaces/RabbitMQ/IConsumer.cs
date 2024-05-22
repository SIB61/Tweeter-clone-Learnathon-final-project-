using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Interfaces.RabbitMQ
{
    public interface IConsumer<TEntity> where TEntity: class
    {
        void Connect();      
    }
}