import { useAnimation } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { TokenModel } from '@shared/models/token.model';
import { UserModel } from '@shared/models/user.model';
import { AbsLocalTokenService } from '@shared/services/abstract/user/abs-local-token.service';
import { AbsLocalUserService } from '@shared/services/abstract/user/abs-local-user.service';

@Injectable({
  providedIn: 'root',
})
export class LocalUserInfoService
  implements AbsLocalUserService, AbsLocalTokenService
{
  constructor(private storage: AbsStorageService) {}
  getLocalUser(): UserModel {
    let user: UserModel = {
      id: this.storage.get(this.storage.userId),
      fullName: this.storage.get(this.storage.name),
      userName: this.storage.get(this.storage.username),
      dateOfBirth: this.storage.get(this.storage.birthDate),
    } as UserModel;
    return user;
  }
  setLocalUser(user: UserModel): boolean {
    this.storage.save(this.storage.userId, user.id);
    this.storage.save(this.storage.username, user.userName);
    this.storage.save(this.storage.name, user.fullName);
    this.storage.save(this.storage.birthDate, user.dateOfBirth);
    return true;
  }

  getLocalToken(): TokenModel {
    let token: TokenModel = {
      token: this.storage.get(this.storage.accessToken),
      refreshToken: this.storage.get(this.storage.refreshToken),
    } as TokenModel;
    return token;
  }

  setLocalToken(token: TokenModel): boolean {
    this.storage.save(this.storage.accessToken, token.token);
    this.storage.save(this.storage.refreshToken, token.refreshToken);
    // this.storage.save(this.storage.,user.dateOfBirth)
    return true;
  }
}
