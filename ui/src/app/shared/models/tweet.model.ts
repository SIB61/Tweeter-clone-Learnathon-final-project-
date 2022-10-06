import { TweetType } from '@shared/enums/tweet.enum';
export interface TweetModel {
  id?: string;
  userId?: string;
  content: string;
  tags: string;
  totalLikes?: number;
  totalComments?: number;
  totalRetweets?: number;
  createdAt?: Date;
  tweetType?: TweetType;
}
