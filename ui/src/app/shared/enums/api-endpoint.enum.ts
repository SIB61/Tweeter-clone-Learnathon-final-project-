export const ApiEndpoints = {
  USERS: 'user',
  LOGIN: 'login',
  REGISTER: 'register',
  REFRESH: 'refresh',
  CHANGE_PASSWORD: 'change-password',
  COMMENT: 'comment',
  TWEET: 'tweet',
  TIMELINE: 'tweet/timeline',
  TWEETID: (id: string): string => `tweet/${id}`,
  FOLLOWER: (id: string): string => `${id}/followers`,
  FOLLOWING: (id: string): string => `${id}/followings`,
  FOLLOW: (id: string): string => `${id}/follow`,
  LIKE: (id: string): string => `like/${id}`,
  SEND_CODE:'forget-password',
  VARIFY_CODE:'resetcode-check',
  CHANGE_FORGET_PASSWORD:'code-password',
  ADMIN_BLOCK:(id:string):string => `Admin/block/${id}`,
  ADMIN_USER_ById:(id:string)=>`Admin/user/${id}`,
  ADMIN_USER:`Admin/user`,


  SEARCHUSER: 'Search/users',
  SEARCHTWEET: 'Search/tweets'
};
