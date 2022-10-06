import { Injectable } from '@angular/core';
import { UserModel } from '@shared/models/user.model';

@Injectable({ providedIn: 'root' })
export abstract class AbsLocalUserService {
  abstract setLocalUser(user: UserModel): boolean;
  abstract getLocalUser(): UserModel;
}
