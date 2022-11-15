export interface UserModel {
  id?: string;
  fullName?: string;
  userName?: string;
  email?: string;
  dateOfBirth?: string;
  totalFollowers?: number;
  totalFollowings?: number;
  totalTweets?: number;
  createdAt?: Date;
  role?: string;
  following?: string;
  password?: string;
  repeatedPassword?: string;
  isFollow?: boolean;
  isBlock?:boolean;
  gender?:number
}
