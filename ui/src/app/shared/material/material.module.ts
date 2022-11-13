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
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import {FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
const matModules = [
  MatFormFieldModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatBadgeModule,
  MatMenuModule,
  ExperimentalScrollingModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSelectModule,
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
  FontAwesomeModule
];

@NgModule({
  declarations: [],
  imports: matModules,
  exports: matModules,
})
export class MaterialModule {}
