using System.Text;
using Newtonsoft.Json;
using core.Interfaces.RabbitMQ;
using RabbitMQ.Client;

namespace infrastructure.Services.RabbitMQ
{

    public class Publish<TEntity> : IPublish<TEntity> where TEntity : class
    {
        private readonly IConnection _connection;
        public Publish(IRabbitMQConnection connection)
        {
            _connection = connection.getConnection();
        }

        public Task publish(TEntity tweet)
        {
            string signalrQueue = "SignalRR" +  (typeof(TEntity).Name);
            string exchangeName = "SignalRR" + (typeof(TEntity).Name);

            using (IModel channel = _connection.CreateModel())
            {

                channel.ExchangeDeclare(exchangeName, ExchangeType.Fanout, true);
                channel.QueueDeclare(signalrQueue, true, false, false, null);
                channel.QueueBind(signalrQueue, exchangeName, "durable");


                var _message = JsonConvert.SerializeObject(tweet);
                var body = Encoding.UTF8.GetBytes(_message);
                channel.BasicPublish(exchange: exchangeName,
                                    routingKey: "",
                                    basicProperties: null,
                                    body: body);

            }
            return Task.CompletedTask;
        }
    }
}