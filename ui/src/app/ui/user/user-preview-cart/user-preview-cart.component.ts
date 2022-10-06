import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { UserModel } from '@shared/models/user.model';

@Component({
  selector: 'app-user-preview-cart',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './user-preview-cart.component.html',
  styleUrls: ['./user-preview-cart.component.scss'],
})
export class UserPreviewCartComponent implements OnInit {
  constructor() {}
  @Input() user: UserModel;
  @Input() actionText: string = '';
  @Output() action: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    console.log(this.user);
  }

  onAction() {
    this.action.emit();
  }
}
