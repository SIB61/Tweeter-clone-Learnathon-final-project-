import { TokenModel } from './token.model';
import { UserModel } from './user.model';

export interface AuthResponseModel {
  user: UserModel;
  token: TokenModel;
}
