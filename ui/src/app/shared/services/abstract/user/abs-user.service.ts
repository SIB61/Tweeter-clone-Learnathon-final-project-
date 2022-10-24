import { Injectable } from '@angular/core';
import { UserModel } from '@shared/models/user.model';
import { Observable } from 'rxjs';

@Injectable()
export abstract class AbsUserService {
  public abstract getAllUser(): Observable<UserModel[]>;
  public abstract getUser(id: string): Observable<UserModel>;
  public abstract getUserByPage(
    pageSize: number,
    pageNumber: number
  ): Observable<any>;
  public abstract updateUser(user: UserModel): Observable<any>;
  public abstract deleteUser(id: string): Observable<any>;
  public abstract createUser(user: UserModel): Observable<any>;
}
