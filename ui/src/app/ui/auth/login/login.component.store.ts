import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '@core/services/concrete/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { LoginCredential } from '@shared/models/auth/auth.model';
import { UserModel } from '@shared/models/user.model';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { catchError, exhaustMap, Observable, tap } from 'rxjs';

export interface LoginState {
  error: string | null;
}

const initialState: LoginState = {
  error: null,
};

@Injectable()
export class LoginComponentStore extends ComponentStore<LoginState> {
  error$ = this.select((state) => state.error);

  constructor(private authService: AbsAuthService, private router: Router,private loadinService: LoadingService) {
    super(initialState);
  }

  login = this.effect((credential$: Observable<LoginCredential>) => {
    return credential$.pipe(
      exhaustMap((auth: LoginCredential) => {
        this.loadinService.setLoading(true)
        return this.authService.login(auth.userName, auth.password).pipe(
          tap(
            (user:UserModel) => {
              this.loadinService.setLoading(false)
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
