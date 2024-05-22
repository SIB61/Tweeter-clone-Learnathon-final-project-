
namespace api.Dtos
{
    public class MemberDto
    {
        public string id {get; set;}
        public string FullName { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;

        public int Gender { get; set; }

        public DateTime DateOfBirth {get; set;}

        public DateTime CreatedAt {get; set;}
        public Boolean isBlock {get; set;}

        public int TotalFollowers{get; set;}
        public int TotalFollowings {get; set;}
        public int TotalTweets {get; set;}
    }
}