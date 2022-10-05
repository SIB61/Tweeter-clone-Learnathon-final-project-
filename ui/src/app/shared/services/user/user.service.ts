import { Injectable } from '@angular/core';
import { AbsHttpService } from '@core/abs-services/http/abs-http.service';
import { AbsLocalTokenService } from '@shared/abs-services/user/abs-local-token.service';
import { AbsLocalUserService } from '@shared/abs-services/user/abs-local-user.service';
import { AbsUserService } from '@shared/abs-services/user/abs-user.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { UserModel } from '@shared/models/user.model';
import { distinctUntilChanged, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService implements AbsUserService {
  constructor(
    private httpService: AbsHttpService,
    private localTokenService: AbsLocalTokenService,
    private localUserService: AbsLocalUserService
  ) {}
  public createUser(user: UserModel): Observable<any> {
    return this.httpService.post(ApiEndpoints.REGISTER, user).pipe(
      distinctUntilChanged(),
      tap((value) => {
        this.localTokenService.setLocalToken(value.data.token);
        this.localUserService.setLocalUser(value.data.user);
      }),
      map((value) => value.data)
    );
  }
  public deleteUser(id: string): Observable<any> {
    return this.httpService.delete(ApiEndpoints.USERS + '/' + id);
  }
  public searchUser(
    name: string,
    pageSize: number,
    pageNumber: number
  ): Observable<any> {
    return of();
  }
  public getAllUser(): Observable<any> {
    return of();
  }
  public getProfile(id: string): Observable<any> {
    return of();
  }
  public getUserByPage(pageSize: number, pageNumber: number): Observable<any> {
    return of();
  }
  public updateUser(user: UserModel): Observable<any> {
    return of();
  }
}
