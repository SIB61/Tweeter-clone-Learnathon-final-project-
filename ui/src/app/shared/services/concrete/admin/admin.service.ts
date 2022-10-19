import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/concrete/http/http.service';
import { AbsAdminService } from '@shared/services/abstract/admin/abs-admin.service';
import { Observable, take } from 'rxjs';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { UserModel } from '@shared/models/user.model';
import {
  PageResponse,
  Response,
} from '@shared/models/structures/response.model';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AdminService implements AbsAdminService {
  constructor(private httpService: HttpService) {}
  block(userId: string): Observable<Response<any>> {
    return this.httpService
      .post(ApiEndpoints.ADMIN_BLOCK(userId), {})
      .pipe(take(1));
  }
  unblock(userId: string): Observable<Response<any>> {
    return this.httpService
      .delete(ApiEndpoints.ADMIN_BLOCK(userId))
      .pipe(take(1));
  }
  getUsers(
    pageNumber: number,
    pageSize: number
  ): Observable<PageResponse<UserModel[]>> {
    return this.httpService
      .get(
        ApiEndpoints.ADMIN_GET_USER,
        new HttpParams()
          .append('pageNumber', pageNumber)
          .append('pageSize', pageSize)
      )
      .pipe(take(1));
  }
  updateUser(userId: string, user: UserModel): Observable<Response<any>> {
    return this.httpService
      .put(ApiEndpoints.ADMIN_UPDATE_USER(userId), user)
      .pipe(take(1));
  }
}
