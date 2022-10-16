import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { matchPassword, strongPassword } from '@shared/validators/custom.validator';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MaterialModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {


  form
  constructor(formBuilder:FormBuilder) {
    this.form=formBuilder.group({
      email:['',[Validators.email,Validators.required]],
      code:['',[Validators.required,Validators.minLength(10)]],
      password:['',[Validators.required,strongPassword]],
      repeatedPassword:['',[Validators.required,matchPassword]]
    })
  }
  loading=true;
  pageNumber=1; 

  ngOnInit(): void {
  }

  get title():string{
     switch(this.pageNumber){
      case 1: return 'Enter Your Email'
      case 2: return 'Enter Verication Code'
      case 3: return 'Enter New Password'
    }
    return ""
  }

  next(){
   this.pageNumber++;
  }
  previous(){
   this.pageNumber--;
  }

}
