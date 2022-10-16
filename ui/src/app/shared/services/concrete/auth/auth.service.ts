import { Injectable } from '@angular/core';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { HttpService } from '@core/services/concrete/http/http.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { AbsLocalUserInfoService } from '@shared/services/abstract/user/abs-local-user-info.service';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements AbsAuthService {
  constructor(
    private httpService: HttpService,
    private storageService: AbsStorageService
  ) {}
  login(username: string, password: string) {
    return this.httpService
      .post(ApiEndpoints.LOGIN, { username, password })
      .pipe(
        tap((value) => {
          this.storageService.setObject('user',value.data.item1)
          this.storageService.setObject('token',value.data.item2)
        })
      );
  }
  refresh() {
    return this.httpService
      .get(environment.base_url + ApiEndpoints.REFRESH)
      .pipe(tap((data: any) => {}));
  }
}
