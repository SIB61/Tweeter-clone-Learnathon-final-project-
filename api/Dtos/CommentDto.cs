using System.ComponentModel.DataAnnotations;


namespace api.Dtos
{
    public class CommentDto
    {
        [Required]
        [MinLength(24)]
        public string TweetId {get; set;} = null!;


        [Required]
        [MinLength(1,ErrorMessage ="Too short!")]
        public string Content {get; set;} = null!;
    }
}