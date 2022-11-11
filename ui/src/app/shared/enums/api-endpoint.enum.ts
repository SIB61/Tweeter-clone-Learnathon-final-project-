import { environment } from "src/environments/environment";

export const ApiEndpoints = {

// Account api
  LOGIN: environment.account_base_url + 'Account/login',
  REGISTER:environment.account_base_url + 'Account/register',
  REFRESH:environment.account_base_url+ 'Account/refresh-key',
  CHANGE_PASSWORD: environment.account_base_url + 'Password/change-password',
  SEND_CODE:environment.account_base_url+ 'Password/forget-password',
  VARIFY_CODE:environment.account_base_url+ 'Password/resetcode-check',
  CHANGE_FORGET_PASSWORD:environment.account_base_url+ 'Password/code-password',


// User api
  USERS: environment.user_base_url + 'user',
  BLOCK: environment.user_base_url + 'Block',



// Tweeter api
  COMMENT: environment.tweeter_base_url+'comment',
  TWEET: environment.tweeter_base_url+'tweet',
  TIMELINE: environment.tweeter_base_url+'tweet/timeline',
  TWEETID: (id: string): string => environment.tweeter_base_url+`tweet/${id}`,
  FOLLOWER: (id: string): string => environment.tweeter_base_url+`${id}/followers`,
  FOLLOWING: (id: string): string => environment.tweeter_base_url+`${id}/followings`,
  FOLLOW: (id: string): string => environment.tweeter_base_url+`${id}/follow`,
  LIKE: (id: string): string => environment.tweeter_base_url+`like/${id}`,


// Admin api
  ADMIN_BLOCK:(id:string):string => `${environment.admin_base_url}Admin/block/${id}`,
  ADMIN_USER_ById:(id:string)=>`${environment.admin_base_url}Admin/user/${id}`,
  ADMIN_USER:environment.admin_base_url+`Admin/user`,


// Search api 
  SEARCH_USER:environment.search_base_url+`search/users`,
  SEARCH_TWEET:environment.search_base_url+`search/tweets`


};
