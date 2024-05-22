using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class HashTagDto
    {
        public DateTime CreatedAt {get; set;}
        public string hashTag {get; set;} =  null!;
        public int Count {get; set;}
    }
}