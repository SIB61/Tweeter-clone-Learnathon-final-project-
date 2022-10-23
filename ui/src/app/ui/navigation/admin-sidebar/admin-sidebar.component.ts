import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/concrete/auth/auth.service';
import { AbsAuthService } from '@shared/services/abstract/auth/abs-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PermissionComponent } from '@ui/dump/permission/permission.component';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss'],
  providers: [{ provide: AbsAuthService, useClass: AuthService }]
})

export class AdminSidebarComponent implements OnInit {
  lastClicked = 1;
  constructor(private authService: AbsAuthService, private dialog: MatDialog) { }
  ngOnInit(): void {
  }

  logout() {
    this.dialog.open(PermissionComponent, { data: "Do you really want to log out?" })
      .afterClosed()
      .subscribe(v => {
      if (v === 'ok')
        this.authService.logout()
    })
  }
}
