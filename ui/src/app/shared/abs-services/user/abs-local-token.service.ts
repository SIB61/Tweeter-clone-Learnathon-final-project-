import { Injectable } from '@angular/core';
import { TokenModel } from '@shared/models/token.model';

@Injectable({ providedIn: 'root' })
export abstract class AbsLocalTokenService {
  abstract setLocalToken(token: TokenModel): boolean;
  abstract getLocalToken(): TokenModel;
}
