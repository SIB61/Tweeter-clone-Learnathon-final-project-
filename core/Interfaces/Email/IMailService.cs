using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Entities;

namespace core.Interfaces.Email
{
    public interface IMailService
    {
        Task<bool> SendAsync(string email, string userName, string password, CancellationToken ct);
    }
}