import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '@shared/material/material.module';
import { strongPassword } from '@shared/validators/custom.validator';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MaterialModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
form:FormGroup
  constructor(fb:FormBuilder) {
  this.form=fb.group({
      currentPassword:['',[strongPassword,Validators.required]],
      newPassword:['',[strongPassword,Validators.required]]
    })
  }

  ngOnInit(): void {
  }

}
