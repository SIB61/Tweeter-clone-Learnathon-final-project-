using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RabbitMQ.Client;

namespace core.Interfaces.RabbitMQ
{
    public interface IRabbitMQConnection
    {
        IConnection getConnection();
    }
}