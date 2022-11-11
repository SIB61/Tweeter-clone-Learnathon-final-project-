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
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';

@Injectable()
export class AdminService implements AbsAdminService {
  constructor(private httpService: AbsHttpService) {}
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
    filter:string,
    pageNumber: number,
    pageSize: number
  ): Observable<PageResponse<UserModel[]>> {
    return this.httpService
      .get(
        ApiEndpoints.ADMIN_USER,
        new HttpParams()
          .append('pageNumber', pageNumber)
          .append('pageSize', pageSize)
        .append('blockpros',filter)
      )
      .pipe(take(1));
  }
  updateUser(userId: string, user: UserModel): Observable<Response<any>> {
    return this.httpService
      .put(ApiEndpoints.ADMIN_USER_ById(userId), user)
      .pipe(take(1));
  }
}
