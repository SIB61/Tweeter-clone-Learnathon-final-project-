import { useAnimation } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { TokenModel } from '@shared/models/token.model';
import { UserModel } from '@shared/models/user.model';
import { AbsLocalUserInfoService } from '@shared/services/abstract/user/abs-local-user-info.service';

@Injectable({
  providedIn: 'root',
})
export class LocalUserInfoService implements AbsLocalUserInfoService {
  constructor(private storage: AbsStorageService) {}
  getLocalUser(): UserModel {
    let user = JSON.parse(this.storage.get('USER'));
    return user;
  }
  setLocalUser(user: UserModel): boolean {
    let userJsonString = JSON.stringify(user);
    this.storage.save('USER', userJsonString);
    return true;
  }

  getLocalToken(): TokenModel {
    let token = JSON.parse(this.storage.get('TOKEN'));
    return token;
  }

  setLocalToken(token: TokenModel): boolean {
    this.storage.save('TOKEN', JSON.stringify(token));
    return true;
  }
}
