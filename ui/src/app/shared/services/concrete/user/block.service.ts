
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbsHttpCacheService } from '@core/services/abstract/http/abs-http-cache.service';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { Response } from '@shared/models/structures/response.model';
import { UserModel } from '@shared/models/user.model';
import { AbsBlockService } from '@shared/services/abstract/user/abs-block.service'
import { map, Observable } from 'rxjs';

@Injectable()
export class BlockService implements AbsBlockService {
    constructor(private httpService: AbsHttpService) { }

    block(userId: any): Observable<Response<any>> {
      return this.httpService.post(ApiEndpoints.BLOCK+"/"+userId,{}) 
    }
    unblock(userId: any): Observable<Response<any>> {
      return this.httpService.delete(ApiEndpoints.BLOCK+"/"+userId) 
    }
    getBlockList(pageNumber: number, pageSize: number): Observable<UserModel[]> {
      return this.httpService.get(ApiEndpoints.BLOCK,new HttpParams().append("PageNumber",pageNumber).append("PageSize",pageSize))
      .pipe(map(res=>res.data))
    }
}
