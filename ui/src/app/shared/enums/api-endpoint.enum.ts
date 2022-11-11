import { environment } from "src/environments/environment";

export const ApiEndpoints = {

// Account api
  LOGIN:  'Account/login',
  REGISTER:'Account/register',
  REFRESH:'Account/refresh-key',
  CHANGE_PASSWORD: 'Password/change-password',
  SEND_CODE: 'Password/forget-password',
  VARIFY_CODE: 'Password/resetcode-check',
  CHANGE_FORGET_PASSWORD: 'Password/code-password',


// User api
  USERS: 'user',
  BLOCK: 'Block',



// Tweeter api
  COMMENT: 'comment',
  TWEET: 'tweet',
  TIMELINE: 'tweet/timeline',
  TWEETID: (id: string): string => `tweet/${id}`,
  FOLLOWER: (id: string): string => `${id}/followers`,
  FOLLOWING: (id: string): string => `${id}/followings`,
  FOLLOW: (id: string): string => `${id}/follow`,
  LIKE: (id: string): string => `like/${id}`,


// Admin api
  ADMIN_BLOCK:(id:string):string => `Admin/block/${id}`,
  ADMIN_USER_ById:(id:string)=>`Admin/user/${id}`,
  ADMIN_USER:`Admin/user`,


// Search api 
  SEARCH_USER:`search/users`,
  SEARCH_TWEET:`search/tweets`,


// notification
  NOTIFICATION:`Notification`


};
