using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class TokenDto
    {
        public String Token {get; set;} = null!;
        public String RefreshToken {get; set;} = null!;
        public DateTime ExpiredTime {get; set;} 
    }
}