export interface TweetModel {
  id?: string;
  userId?: string;
  fullName?: string;
  content: string;
  hashTag?: string;
  totalLikes?: number;
  totalComments?: number;
  totalRetweets?: number;
  createdAt?: Date;
  isRetweet?: boolean;
  isLiked?: boolean;
}
