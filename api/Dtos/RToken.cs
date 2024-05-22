using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class RToken
    {
        [Required]
        public String token {get; set;} = null!;

        [Required]
        public String refreshKey {get; set;} = null!;
    }
}