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
  password?: string;
  repeatedPassword?: string;
}
