using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Entities;

namespace core.Interfaces
{
    public interface INotificationRepository : IRepository<Notification>
    {
        void UpdateBlockAttribute(string to, string from, bool flag);
    }
}