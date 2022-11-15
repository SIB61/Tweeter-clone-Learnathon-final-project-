import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsHttpService } from '@core/services/abstract/http/abs-http.service';
import { HttpService } from '@core/services/concrete/http/http.service';
import { ApiEndpoints } from '@shared/enums/api-endpoint.enum';
import { UserPreviewCartComponent } from '../user-preview-cart/user-preview-cart.component';
import { map } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PageResponse } from '@shared/models/structures/response.model';
import { UserModel } from '@shared/models/user.model';
import { ThousandPipe } from '@shared/pipes/thousand.pipe';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-user',
  standalone: true,
  imports: [CommonModule,UserPreviewCartComponent,ThousandPipe,MaterialModule, RouterModule],
  templateUrl: './side-user.component.html',
  styleUrls: ['./side-user.component.scss']
})
export class SideUserComponent implements OnInit {

  constructor(private httpService: AbsHttpService) { 
         
  }

  users$ = this.httpService.get(ApiEndpoints.USERS+"/get-users",new HttpParams().append('PageSize',8)).pipe(map((res:PageResponse<UserModel[]>)=>res.data))
  

  ngOnInit(): void {
    this.users$.subscribe(v=>console.log(v))
  }

}
