import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { AuthService } from '@shared/services/concrete/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { SendCodeComponent } from '../send-code/send-code.component';
import { ForgetPasswordComponent } from '@ui/layouts/forget-password/forget-password.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  providers: [{ provide: AbsAuthService, useClass: AuthService }],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent    {
  form: FormGroup;
  hidden = true;
  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authService: AbsAuthService,
    private dialog:MatDialog
  ) {
    this.form = formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  submit() {
    this.authService
      .login(this.form.value.username, this.form.value.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('');
        },
      });
  }

  forgetPassword(){
    this.dialog.open(ForgetPasswordComponent)
  }
}
