import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPassword, strongPassword, validAge } from 'src/app/shared/validators/custom.validator';
import { MaterialModule } from '@shared/material/material.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,MaterialModule,RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  subscription: Subscription | null = null;
  hidden = true;
  rHidden = true;
  invalidUserName = false;
  invalidEmail = false;
  showProgres = false;

  constructor(formBuilder:FormBuilder){
  this.form = formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    birthDate: ['', [Validators.required, validAge]],
    password: ['', [Validators.required, strongPassword]],
    repeatedPassword: ['', [Validators.required, matchPassword]],
  });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.hidden = true;
    this.rHidden = true;
    this.invalidUserName = false;
    this.invalidEmail = false;
    this.showProgres = false;
  }

  getErrorMsg(control: AbstractControl | null) {
    switch (control) {
      case this.form.get('username'):
        if (control?.hasError('required')) return '*username required';
        break;
      case this.form.get('email'):
        if (control?.hasError('required')) return '*email required';
        else if (control?.hasError('email')) return '*invalid email';
        break;
      case this.form.get('birthDate'):
        if (control?.hasError('required')) return '*date for birth is required';
        else if (control?.hasError('validAge')) return '*minimum age is 18';
        break;
      case this.form.get('password'):
        if (control?.hasError('required')) return '*password required';
        else if (control?.hasError('strongPassword'))
          return '*weak! must include lowercase uppercase and number';
        break;
      case this.form.get('repeatedPassword'):
        if (control?.hasError('required')) return '*repeated password required';
        else if (control?.hasError('matchPassword'))
          return "*password didn't match";
        break;
      default:
        return '*error';
    }
    return '*error';
  }

  submit() {
//    this.loaderService.setLoading(true);
    console.warn('from register method');
    this.showProgres = true;
    this.invalidEmail = false;
    this.invalidUserName = false;
    // this.subscription = this.authService
    //   .register({
    //     username: content.username,
    //     email: content.email,
    //     password: content.password,
    //     birthDate: content.birthDate,
    //   })
    //   .subscribe({
    //     next: (value) => {
    //       console.warn(value);
    //       if (value) {
    //         this.showProgres = false;
    //         this.loaderService.setLoading(false);
    //         this.snackbar.open('Registered Successfully', 'ok');
    //         localStorage.setItem('access_token', value.data.token);
    //         localStorage.setItem('refresh_token', value.data.refreshToken);
    //         localStorage.setItem('username', value.data.username);
    //         localStorage.setItem('expired_time',value.data.expiredTime);
    //         this.router.navigateByUrl('/home');
    //       }
    //     },
    //     error: (error: HttpErrorResponse) => {
    //       this.showProgres = false;
    //       if (error.error == 'username') {
    //         this.invalidUserName = true;
    //         this.snackbar.open('username allready exists', 'ok');
    //       } else if (error.error == 'email') {
    //         this.invalidEmail = true;
    //         this.snackbar.open('email allready exists', 'ok');
    //       }
    //       console.warn(error);
    //       this.loaderService.setLoading(false);
    //       this.snackbar.open('registration failed', 'ok');
    //     },
    //   });
  }
}
