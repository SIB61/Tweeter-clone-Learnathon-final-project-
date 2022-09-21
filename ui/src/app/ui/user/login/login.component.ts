import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { MaterialModule } from '@shared/material/material.module';
import { AbsAuthService } from '@shared/abs-services/auth/abs-auth.service';
import { AuthService } from '@shared/services/auth/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,MaterialModule,ReactiveFormsModule,RouterModule],
  providers:[{provide:AbsAuthService,useClass:AuthService}],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form:FormGroup
  hidden=true;
  constructor(formBuilder:FormBuilder,private router:Router, 
  private authService:AbsAuthService) {
    this.form = formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  ngOnInit(): void {

  }
  submit(){
   this.authService.login(this.form.value.username,this.form.value.password).subscribe()
   this.router.navigateByUrl('/home')
  }
}
