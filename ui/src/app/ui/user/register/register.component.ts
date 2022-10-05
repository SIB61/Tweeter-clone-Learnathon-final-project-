import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  matchPassword,
  strongPassword,
  validAge,
} from 'src/app/shared/validators/custom.validator';
import { MaterialModule } from '@shared/material/material.module';
import { AbsUserService } from '@shared/abs-services/user/abs-user.service';
import { UserModel } from '@shared/models/user.model';
import { UserService } from '@shared/services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[
    {
      provide:AbsUserService,
      useClass:UserService
    }
  ]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  subscription: Subscription | null = null;
  hidden = true;
  rHidden = true;

  constructor(formBuilder: FormBuilder, private userService: AbsUserService) {
    this.form = formBuilder.group({
      fullName: ['', Validators.required],
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
    let user = this.form.value;
    console.warn('from register method');
    this.userService
      .createUser({
        fullName: user.fullName as string,
        userName: user.username as string,
        email: user.email as string,
        dateOfBirth: user.birthDate as string,
        password: user.password as string,
      })
      .subscribe();
  }
}
