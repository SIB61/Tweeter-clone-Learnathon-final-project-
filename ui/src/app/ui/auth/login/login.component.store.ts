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
  pending$ = this.select((state) => state.loading);
  error$ = this.select((state) => state.error);

  constructor(private authService: AbsAuthService, private router: Router) {
    super(initialState);
  }

  login = this.effect((credentials: Observable<LoginCredential>) => {
    return credentials.pipe(
      exhaustMap((auth: LoginCredential) => {
        this.patchState({loading: true});
        return this.authService.login(auth.userName, auth.password).pipe(
          tap(
            (user:UserModel) => {
              this.patchState({
                loading: false,
              });
              if(user.role==='Admin')
              this.router.navigateByUrl('/admin');
              else this.router.navigateByUrl('/home')
            },
          ),
        );
      })
    );
  });
}
