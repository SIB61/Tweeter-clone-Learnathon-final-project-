import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http/http.service';
import { AbsAuthService } from '@shared/abs-services/auth/abs-auth.service';
import { AbsLocalTokenService } from '@shared/abs-services/user/abs-local-token.service';
import { AbsLocalUserService } from '@shared/abs-services/user/abs-local-user.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { AuthResponseModel } from '@shared/models/auth-response.model';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AbsAuthService {
  static loggedIn: boolean = localStorage.getItem('access_token') != null;
  constructor(
    private httpService: HttpService,
    private localUserService: AbsLocalUserService,
    private localTokenService: AbsLocalTokenService
  ) {}
  login(username: string, password: string) {
    return this.httpService
      .post(ApiEndpoints.LOGIN, { username, password })
      .pipe(
        tap((value) => {
          this.localUserService.setLocalUser(value.data.user);
          this.localTokenService.setLocalToken(value.data.token);
        })
      );
  }
  refresh() {
    return this.httpService
      .get(environment.base_url + ApiEndpoints.REFRESH)
      .pipe(tap((data: any) => {}));
  }
}
