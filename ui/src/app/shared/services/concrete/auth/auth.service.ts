import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { HttpService } from '@core/services/concrete/http/http.service';
import { tapResponse } from '@ngrx/component-store';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { PageResponse } from '@shared/models/structures/response.model';
import { TokenModel } from '@shared/models/token.model';
import { UserModel } from '@shared/models/user.model';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { map, Observable, of, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService implements AbsAuthService {
  constructor(
    private httpService: AbsHttpService,
    private storageService: AbsStorageService,
    private router: Router
  ) {}
  login(username: string, password: string): Observable<UserModel> {
    return this.httpService
      .post(ApiEndpoints.LOGIN, { username, password })
      .pipe(
        map((value) => {
          this.storageService.setObject('user', value.data.item1);
          this.storageService.setObject('token', value.data.item2);
          return value.data.item1;
        })
      );
  }

  refresh() {
    let token = this.storageService.getObject<TokenModel>(
      this.storageService.TOKEN
    );
    if (token.refreshToken != null)
      return this.httpService
        .post(ApiEndpoints.REFRESH, {
          token: token.token,
          refreshKey: token.refreshToken,
        })
        .pipe(
          take(1),
          tapResponse(
            (data: PageResponse<TokenModel>) => {
              this.storageService.setObject(
                this.storageService.TOKEN,
                data.data
              );
            },
            (err) => {
              this.logout();
            }
          )
        );
    else return of().pipe(take(0));
  }

  sendCode(email: string): Observable<any> {
    return this.httpService.post(
      ApiEndpoints.SEND_CODE,
      {},
      new HttpParams().append('email', email)
    );
  }

  changeForgottenPassword(
    email: string,
    code: string,
    password: string
  ): Observable<any> {
    return this.httpService.post(ApiEndpoints.CHANGE_FORGET_PASSWORD, {
      email,
      code,
      password,
    });
  }

  varifyCode(email: string, code: string): Observable<any> {
    return this.httpService.get(
      ApiEndpoints.VARIFY_CODE,
      new HttpParams().append('code', code).append('email', email)
    );
  }
  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/account/sign-in');
  }
}
