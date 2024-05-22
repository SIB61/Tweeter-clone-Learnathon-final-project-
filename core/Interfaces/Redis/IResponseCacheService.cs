using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Interfaces.Redis
{
    public interface IResponseCacheService
    {
        Task CacheResponseAsync(string cacheKey, Object response, TimeSpan timeTimeLive);
        Task<string> GetCachedResponseAsync(string cacheKey);

        Task<Boolean> DeleteAllkeysAsnyc();
    }
}