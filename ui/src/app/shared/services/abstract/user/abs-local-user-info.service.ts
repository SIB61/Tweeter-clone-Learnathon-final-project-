import { Injectable } from '@angular/core';
import { TokenModel } from '@shared/models/token.model';
import { UserModel } from '@shared/models/user.model';

@Injectable({ providedIn: 'root' })
export abstract class AbsLocalUserInfoService {
  abstract setLocalToken(token: TokenModel): boolean;
  abstract getLocalToken(): TokenModel;
  abstract setLocalUser(user: UserModel): boolean;
  abstract getLocalUser(): UserModel;
}
