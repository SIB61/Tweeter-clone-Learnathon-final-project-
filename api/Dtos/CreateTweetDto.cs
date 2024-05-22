
using System.ComponentModel.DataAnnotations;

namespace api.Dtos
{
    public class CreateTweetDto
    {
        [Required]
        [MinLength(1,ErrorMessage ="Too short!")]
        public string Content {get; set;} = null!;
        public string? HashTag {get; set;} 
    }
}