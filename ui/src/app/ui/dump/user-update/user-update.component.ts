import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserModel } from '@shared/models/user.model';
import { validAge } from '@shared/validators/custom.validator';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [CommonModule,MaterialModule,ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  public form:FormGroup;

  constructor(private formBuilder:FormBuilder,
  @Inject(MAT_DIALOG_DATA) private data:UserModel
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fullName:[this.data.fullName,[Validators.minLength(4),Validators.required]],
      dateOfBirth:[this.data.dateOfBirth,[validAge,Validators.required]]
    })
  }

}
