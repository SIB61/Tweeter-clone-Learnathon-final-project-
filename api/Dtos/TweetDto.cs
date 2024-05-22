

namespace api.Dtos
{
    public class TweetDto
    {
        public string id {get; set;}
        public DateTime CreatedAt {get; set;}
        public string UserId {get; set;} = null!;
        public string FullName {get; set;} = null!;
        public string UserName {get; set;} = null!;
        public string Content {get; set;} = null!;
        public string? HashTag {get; set;} 
        public int TotalLikes {get; set;}
        public int TotalComments {get; set;}
        public int TotalRetweets {get; set;}
        public Boolean IsRetweet {get; set;} = false;
        public TweetDto ParentTweet {get; set;}
        public Boolean isLiked {get; set;} = false;
    }
}