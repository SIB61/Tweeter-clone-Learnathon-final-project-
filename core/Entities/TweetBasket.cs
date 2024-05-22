using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace core.Entities
{
    public class TweetBasket
    {
      
        public string Id {get; set;}
        public List<Object> tweets{get; set;}
    }

    public class TweetBasketCount
    {
        public string Id {get; set;}
        public int Count {get; set;}
    }
}