import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPassword, strongPassword } from '@shared/validators/custom.validator';
import { SendCodeComponent } from '@ui/auth/send-code/send-code.component';
import { VarifyCodeComponent } from '@ui/auth/varify-code/varify-code.component';
import { ChangePasswordComponent } from '@ui/user/change-password/change-password.component';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@shared/services/concrete/auth/auth.service';
import { ForgetPasswordComponentStore } from './forget-password.component.store';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MaterialModule, SendCodeComponent, VarifyCodeComponent, ChangePasswordComponent],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  providers:[{provide:AbsAuthService,useClass:AuthService},ForgetPasswordComponentStore]
})
export class ForgetPasswordComponent implements OnInit {
  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;
  page$ = this.store.page$

  email:string 
  code:string 
  password:string


  constructor(private router:Router,private location:Location,private snackbar:MatSnackBar,private formBuilder: FormBuilder,private authService: AbsAuthService,
    private store : ForgetPasswordComponentStore 
    ) {}
  back(){
   this.location.back()
  }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    })
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, strongPassword]],
      repeatedPassword: ['', [Validators.required, matchPassword]]
    })
    this.codeForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
    })
    this.email = this.emailForm.value.email
    this.password = this.passwordForm.value.password
    this.code = this.codeForm.value.code
  }

  next(pageIndex:number) {
    if(pageIndex==1) this.sendCode()
    else if(pageIndex==2) this.varifyCode()
    else if(pageIndex==3) this.changePassword()
  }

  previous(pageIndex:number) {
    this.store.updatePageIndex(pageIndex-1)
  }

  sendCode(){
    this.store.sendCode(
      this.emailForm.value.email
    )
  }

  varifyCode(){
    this.store.varifyCode({
      email:this.emailForm.value.email,
      code:this.codeForm.value.code
    })
  }

  changePassword(){
    this.store.changePassword({
      email:this.emailForm.value.email,
      code:this.codeForm.value.code,
      password:this.passwordForm.value.password
    })
  }
  nextDisabled(pageIndex: number):boolean{
    let isFormInvalid = true
    if(pageIndex==1) isFormInvalid = this.emailForm.invalid
    else if(pageIndex==2) isFormInvalid = this.codeForm.invalid
    else if(pageIndex==3) isFormInvalid = this.passwordForm.invalid
    return isFormInvalid
  }

}
