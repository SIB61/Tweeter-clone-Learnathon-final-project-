using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Interfaces.RabbitMQ
{
    public interface IPublish<TEntity> where TEntity : class
    {
        Task publish(TEntity data);
    }
}