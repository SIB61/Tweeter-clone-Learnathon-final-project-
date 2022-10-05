import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatChipsModule } from '@angular/material/chips';
const matModules = [
  MatFormFieldModule,
  MatPaginatorModule,
  MatMenuModule,
  MatToolbarModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  ScrollingModule,
  MatChipsModule,
  MatSidenavModule,
  MatCardModule,
  MatButtonToggleModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTabsModule,
  MatRippleModule,
];

@NgModule({
  declarations: [],
  imports: matModules,
  exports: matModules,
})
export class MaterialModule {}
