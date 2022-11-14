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
import { LoginComponentStore, LoginState } from './login.component.store';
import { LoadingService } from '@core/services/concrete/loading.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  providers: [{ provide: AbsAuthService, useClass: AuthService },LoginComponentStore],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit  {
  form: FormGroup;
  hidden = true;
  constructor(
    public loadingService: LoadingService,
    private  formBuilder: FormBuilder,
    private loginComponentStore:LoginComponentStore
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    let formValue:any=this.form.value
    this.loginComponentStore.login({userName:formValue.username,password:formValue.password})
  }
}
