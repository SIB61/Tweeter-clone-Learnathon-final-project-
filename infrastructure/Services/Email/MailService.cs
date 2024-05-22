using core.Entities.ServiceEntities;
using core.Interfaces.Email;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace infrastructure.Services.Email
{
    public class MailService : IMailService
    {
        private readonly MailSettings _settings;
        public MailService(IOptions<MailSettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task<bool> SendAsync(string recipientEmail,string userName, string code, CancellationToken ct = default)
        {
            try
            {
                var email = new MimeMessage();
                email.Sender = MailboxAddress.Parse(_settings.From);
                email.To.Add(MailboxAddress.Parse(recipientEmail));
                email.Subject = code +  " is your Twitter account recovery code";
                var builder = new BodyBuilder();
                
                string body = "<body> <div style=\"font-size: larger; padding: 20px; display: flex; justify-content: center; align-items: center; margin: auto; box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;\"><div> <hr><p>Hi, "+ userName + "</p><p>We received a request to reset your twitter password.&ensp;Enter the following password reset code-</p> <p style=\"padding: 10px 0px;\"><span style=\"padding:10px; font-weight: bold; background-color: #4A9BF0; color: white;\">"+ code + "</span></p> <small style=\"text-decoration: underline; color: lightcoral;;\">This code is valid for 5 minutes and can only be used once</small> <p style=\"margin-top: 2rem;\">Thanks <p></p>Team: _Look_at_Baby</p></div></div> </body>";

                builder.HtmlBody = body;

                email.Body = builder.ToMessageBody();
        
                using var smtp = new SmtpClient();
                smtp.Connect(_settings.Host, _settings.Port, SecureSocketOptions.StartTls);
                smtp.Authenticate(_settings.From, _settings.Password);
                await smtp.SendAsync(email);
                smtp.Disconnect(true);
                return true;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return false;
            }
        }
    }
}