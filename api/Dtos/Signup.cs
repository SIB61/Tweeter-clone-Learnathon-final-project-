using System.ComponentModel.DataAnnotations;
using api.Helpers;

namespace api.Dtos
{
    public class Signup
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please Provide  Name")]  
        [StringLength(350, MinimumLength = 3, ErrorMessage = "Name Should be min 3 and max 350 length")]
        public string FullName {get; set;} = null!;


        [Display(Name = "Date of Birth")]  
        [DataType(DataType.Date)]  
        [Min18Years] 
        public DateTime DateOfBirth {get; set;}

        [Required]
        [MinLength(3)]
        public string UserName {get; set;} = null!;

        [Required]
        [EmailAddress]
        public string Email {get; set;} = null!;


        public int Gender { get; set; }


        public DateTime CreatedAt {get; protected set;} = DateTime.Now;


        [ValidatePassword]
        public string Password {get; set;} = null!;
    }
}