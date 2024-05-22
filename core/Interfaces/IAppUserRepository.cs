using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Entities;

namespace core.Interfaces
{
    public interface IAppUserRepository: IRepository<AppUser>
    {
        Task<IEnumerable<AppUser>> SearchingUsers(string UserName, int pageNumber, int pageSize);
        Task<int> SearchingUsersCountAsync(string userName);
        Task<IEnumerable<Follow>> Follwer(string UserId, int pageNumber, int pageSize);
    }
}