namespace core.Entities.ServiceEntities
{
    public class MailSettings
    {
        public string From { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Host { get; set; } = null!;
        public int Port { get; set; }
    }
}