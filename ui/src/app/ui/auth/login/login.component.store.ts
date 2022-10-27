import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { LoginCredential } from '@shared/models/auth/auth.model';
import { UserModel } from '@shared/models/user.model';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { catchError, exhaustMap, Observable, tap } from 'rxjs';

export interface LoginState {
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  loading: false,
  error: null,
};

@Injectable()
export class LoginComponentStore extends ComponentStore<LoginState> {
  loading$ = this.select((state) => state.loading);
  error$ = this.select((state) => state.error);

  constructor(private authService: AbsAuthService, private router: Router) {
    super(initialState);
  }

  updateLoading = this.updater((state,loading:boolean)=>({...state,loading:loading}))

  login = this.effect((credential$: Observable<LoginCredential>) => {
    return credential$.pipe(
      exhaustMap((auth: LoginCredential) => {
        this.updateLoading(true)
        return this.authService.login(auth.userName, auth.password).pipe(
          tapResponse(
            (user:UserModel) => {
              this.updateLoading(false)
              if(user.role==='Admin')
              this.router.navigateByUrl('/admin');
              else this.router.navigateByUrl('/home')
            },
            (err)=>{
              this.updateLoading(false)
            }
          ),
        );
      })
    );
  });
}
