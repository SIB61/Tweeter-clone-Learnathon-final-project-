
using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class UUserDto
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Please Provide Last Name")]  
        [StringLength(350, MinimumLength = 3, ErrorMessage = "Name Should be min 5 and max 350 length")]
        public string FullName {get; set;} = null!;

        [Display(Name = "Date of Birth")]  
        [DataType(DataType.Date)]  
        public DateTime DateOfBirth {get; set;}
    }
}