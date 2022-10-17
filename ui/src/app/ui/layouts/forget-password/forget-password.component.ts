import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPassword, strongPassword } from '@shared/validators/custom.validator';
import { SendCodeComponent } from '@ui/auth/send-code/send-code.component';
import { VarifyCodeComponent } from '@ui/auth/varify-code/varify-code.component';
import { ChangePasswordComponent } from '@ui/user/change-password/change-password.component';
import { delay, interval, tap, throwError, timeout } from 'rxjs';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { text } from '@fortawesome/fontawesome-svg-core';
import { AuthService } from '@shared/services/concrete/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MaterialModule, SendCodeComponent, VarifyCodeComponent, ChangePasswordComponent],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers:[{provide:AbsAuthService,useClass:AuthService}]
})
export class ForgetPasswordComponent implements OnInit {


  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;
  pages:any;
  page:any;
  constructor(private router:Router,private snackbar:MatSnackBar,formBuilder: FormBuilder,private authService: AbsAuthService) {
    this.emailForm = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    })
    this.passwordForm = formBuilder.group({
      password: ['', [Validators.required, strongPassword]],
      repeatedPassword: ['', [Validators.required, matchPassword]]
    })
    this.codeForm = formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    })
  }
  loading = false;
  pageNumber = 1;
  getPage(index: number) {
    return this.pages.find(p => p.index === index)
  }
  ngOnInit(): void {
  this.pages = [
    {
      index: 1,
      title: "Enter Your Email",
      subtitle: "We will send a varification code to your email",
      next: "send code",
      nextDisabled:()=>this.emailForm.invalid
    },
    {
      index: 2,
      title: "Enter Varification Code",
      subtitle: "We have sent a varification code to your email",
      next: "varify",
      nextDisabled:()=>this.codeForm.invalid
    },
    {
      index: 3,
      title: "Enter New Password",
      subtitle: "",
      next: "change",
      nextDisabled:()=>this.passwordForm.invalid
    }
  ]
  this.page = this.getPage(1);
  }

  next() {
    if(this.pageNumber==1) this.sendCode()
    else if(this.pageNumber==2) this.varifyCode()
    else if(this.pageNumber==3) this.changePassword()
  }
  previous() {
    this.pageNumber--;
    this.page = this.getPage(this.pageNumber)
  }

  sendCode(){
    this.loading=true;
    this.authService.sendCode(this.emailForm.value.email).pipe(
      tap(_=>{
        this.loading=false;
        this.pageNumber++
        this.page = this.getPage(this.pageNumber)
      })
    ).subscribe()
  }
  varifyCode(){
    this.loading=true
    this.authService.varifyCode(this.emailForm.value.email,this.codeForm.value.code).pipe(
      tap(_=>{
        this.loading=false;
        this.pageNumber++
        this.page = this.getPage(this.pageNumber)
      })
    ).subscribe()
  }
  changePassword(){
    this.loading=false
    this.authService
      .changeForgottenPassword(this.emailForm.value?.email,this.codeForm.value?.code,this.passwordForm.value?.password)
      .pipe(
      tap(_=>{
        this.loading=false;
        this.router.navigateByUrl('/account')
        this.snackbar.open("your password was successfully changed","ok")
      }),
      ).subscribe()
  }
}
