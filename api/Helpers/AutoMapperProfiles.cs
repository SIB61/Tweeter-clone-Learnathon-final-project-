using api.Dtos;
using AutoMapper;
using core.Entities;
namespace api.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles(){
            
            CreateMap<Signup, AppUser>();
            CreateMap<AppUser, UserDto>();
            
            CreateMap<TokenDto, Token>()
                .ForMember(token => token.UToken, tokenDto=>tokenDto.MapFrom(tokenDto => tokenDto.Token));

            CreateMap<Tuple<String,DateTime>, TokenDto>()
                .ForMember( token => token.Token, tuple => tuple.MapFrom(tuple => tuple.Item1))
                .ForMember( token => token.ExpiredTime, tuple => tuple.MapFrom(tuple => tuple.Item2));


            CreateMap<AppUser, UserDto>();
            CreateMap<AppUser, MemberDto>();
            CreateMap<CommentDto, Comments>();
            CreateMap<CreateTweetDto, Tweet>();
            CreateMap<Tweet, Tweet>();
            CreateMap<AppUser, SUserDto>();
            CreateMap<Tweet, TweetDto>();
            CreateMap<AppUser, FollwerDto>();

            CreateMap<HashTag, HashTagDto>();

        }
    }
}