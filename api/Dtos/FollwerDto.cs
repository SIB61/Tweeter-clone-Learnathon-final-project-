
namespace api.Dtos
{
    public class FollwerDto
    {   

        public string Id { get; set;}
        public string FullName { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime DateOfBirth {get; set;}
        public DateTime CreatedAt { get; set; }
        public DateTime Since {get;set;}
        public Boolean isFollow {get; set;}
    }
}