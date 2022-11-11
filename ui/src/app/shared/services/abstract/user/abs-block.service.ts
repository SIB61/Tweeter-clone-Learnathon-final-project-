import { Injectable } from '@angular/core';
import { PageResponse, Response } from '@shared/models/structures/response.model';
import { UserModel } from '@shared/models/user.model';
import { BlockService } from '@shared/services/concrete/user/block.service';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root',useClass:BlockService})
export abstract class AbsBlockService {
    constructor() { }
    abstract block(userId):Observable<Response<any>>
    abstract unblock(userId):Observable<Response<any>>
    abstract getBlockList(pageNumber:number,pageSize:number):Observable<UserModel[]>
}