import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { map, Observable, switchMap, tap } from 'rxjs';

interface ForgetPasswordComponentState {
  pageIndex: number;
  loading: boolean;
  page:any
}

@Injectable()
export class ForgetPasswordComponentStore extends ComponentStore<ForgetPasswordComponentState> {

  pages = [
    {
      index: 1,
      title: "Enter Your Email",
      subtitle: "We will send a varification code to your email",
      next: "send code",
    },
    {
      index: 2,
      title: "Enter Varification Code",
      subtitle: "We have sent a varification code to your email",
      next: "varify",
    },
    {
      index: 3,
      title: "Enter New Password",
      subtitle: "",
      next: "change",
    }
  ]


  constructor(private authService: AbsAuthService,private router:Router)
  {
    super({loading:false,page:{},pageIndex:1});
    this.setPage(this.pageIndex$)
  }


  private  pageIndex$ = this.select((state) => state.pageIndex);
  page$ = this.select((state)=>state.page)
  loading$ = this.select((state) => state.loading);

  updatePageIndex = this.updater((state,value:number) =>({...state,pageIndex:value}))

  updatePage = this.updater((state, value: any) => ({
    ...state,
    page: value,
  }));

  updateEmail = this.updater((state, value: string) => ({
    ...state,
    email: value,
  }));
  updateCode = this.updater((state, value: string) => ({
    ...state,
    code: value,
  }));
  updateLoading = this.updater((state, value: boolean) => ({
    ...state,
    loading: value,
  }));

  sendCode = this.effect((email$:Observable<string>) => {
    return email$.pipe(
      switchMap((email) => {
      this.updateLoading(true);
        return this.authService.sendCode(email).pipe(
          tap((_) => {
            this.updateLoading(false);
            this.updatePageIndex(2);
          })
        );
      })
    );
  });

  varifyCode = this.effect((credential$:Observable<{email:string,code:string}>) => {
    return credential$.pipe(
        switchMap((credential) => {
    this.updateLoading(true)
            return this.authService.varifyCode(credential.email,credential.code).pipe(
                tap((_) => {
                    this.updateLoading(false)
                    this.updatePageIndex(3)
                })
            )
        })
    )
  })
 
  changePassword = this.effect((credential$:Observable<{email:string,code:string,password:string}>)=>{
    return credential$.pipe(
      switchMap(credential=>{
      this.updateLoading(true)
        return this.authService.changeForgottenPassword(credential.email,credential.code,credential.password)
        .pipe(tap(()=>{
          this.updateLoading(false)
          this.router.navigateByUrl('/account/sign-in') 
        }))
      })
    )
  })

  setPage = this.effect((pageIndex$:Observable<number>)=>{
    return pageIndex$.pipe(tap((pageIndex:number) =>{
      this.updatePage(this.pages[pageIndex-1])  
    }))
  })

}
