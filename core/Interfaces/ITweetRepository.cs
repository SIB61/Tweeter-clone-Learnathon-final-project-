using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using core.Entities;

namespace core.Interfaces
{
    public interface ITweetRepository : IRepository<Tweet>
    {
     
        Task<IEnumerable<Tweet>> SearchTweet(string hashTag, int pageNumber, int pageSize);
        Task<Object> UserTimeLine(string userId, int pageNumber, int pageSize);
        Task<int> UserTimeLineCount(string userId);
        Task<int> HashTagPostCount(string hashTag);
       
    }

}