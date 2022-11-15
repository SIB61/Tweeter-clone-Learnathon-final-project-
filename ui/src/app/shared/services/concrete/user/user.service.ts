import { Injectable } from '@angular/core';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { AbsStorageService } from '@core/services/abstract/storage/abs-storage.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { UserModel } from '@shared/models/user.model';
import { AbsUserService } from '@shared/services/abstract/user/abs-user.service';
import { distinctUntilChanged, map, Observable, of, take, tap } from 'rxjs';

@Injectable()
export class UserService implements AbsUserService {
  user:UserModel;
  constructor(
    private httpService: AbsHttpService,
    private storageService: AbsStorageService
  ) {
    this.user = storageService.getObject<UserModel>('user')
  }
  public createUser(user: UserModel): Observable<any> {
    return this.httpService.post(ApiEndpoints.REGISTER, user).pipe(
      take(1),
      tap((value) => {
        this.storageService.setObject('user',value.data.item1)
        this.storageService.setObject('token',value.data.item2)
      }),
      map((value) => value.data)
    );
  }
  public deleteUser(id: string): Observable<any> {
    return this.httpService.delete(ApiEndpoints.USERS + '/' + id);
  }
public changePassword(oldPassword: string, newPassword: string): Observable<any> {
  return this.httpService.post(ApiEndpoints.CHANGE_PASSWORD,{oldPassword,newPassword}) 
}
  public getAllUser(): Observable<UserModel[]> {
    return of();
  }
  public getUser(id: string): Observable<UserModel> {
    return this.httpService
      .get(`${ApiEndpoints.USERS}/${id}`)
      .pipe(map((response) => response.data));
  }

  public getUserByPage(
    pageSize: number,
    pageNumber: number
  ): Observable<UserModel[]> {
    return of();
  }
  public updateUser(user: UserModel): Observable<any> {
    return this.httpService.put(ApiEndpoints.USERS,{fullName:user.fullName,dateOfBirth:user.dateOfBirth});
  }
}
