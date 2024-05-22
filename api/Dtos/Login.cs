using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class Login
    {
         
        [Required]
        public string UserName {get; set;} = null!;

        [Required]
        public string Password {get; set;} = null!;
    }
}