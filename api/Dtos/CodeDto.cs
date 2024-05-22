
using System.ComponentModel.DataAnnotations;
using api.Helpers;

namespace api.Dtos
{
    public class CodeDto
    {
        [Required]
        [EmailAddress]
        public String Email {get; set;} = null!;

        [Required]
        [MinLength(6,ErrorMessage ="must be 8 char")]
        public String Code {get; set;} = null!;

        [Required]
        [CodePasswordValidation]
        public String Password {get; set;} = null!;
    }
}