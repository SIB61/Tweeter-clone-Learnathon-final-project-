using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Interfaces.Redis
{
    public interface IRedisService
    {
        Task SetAsync(string key, string value, TimeSpan timeTimeLive);
        Task<string> GetAsync(string key);
        Task<Boolean> DeleteAsync(string key);

        Task DeleteAllkeysAsnyc();
    }
}