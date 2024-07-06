using core.Entities.ServiceEntities;
using core.Interfaces.RabbitMQ;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace infrastructure.Services.RabbitMQ
{
    public class RabbitMQConnection : IRabbitMQConnection
    {
        private IConnection _connection;
        public RabbitMQConnection(IOptions<RabbitMQConnectionFactorySettings> rabbitMQConnectionString)
        {
            var factory = new ConnectionFactory()
            {
                Uri = new Uri(rabbitMQConnectionString.Value.Uri),
            };
            factory.AutomaticRecoveryEnabled = true;
            factory.DispatchConsumersAsync = true;
            _connection = factory.CreateConnection();
        }


        public IConnection getConnection()
        {
            return _connection;
        }
    }
}