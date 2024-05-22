using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;

namespace api.Dtos
{
    public class PasswordChange
    {
        [Required]
        public string oldPassword {get; set;} = null!;


        [Required]
        [ChangePassword]
        public string newPassword {get; set;} = null!;

    }
}