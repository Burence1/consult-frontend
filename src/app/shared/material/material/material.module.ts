import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs'; 

import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const material = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatCarouselModule.forRoot(),
  MatDialogModule,
  MatToolbarModule,
  MatBadgeModule,
<<<<<<< HEAD
  MatTabsModule
=======
  MatTabsModule,

  MatFormFieldModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatSnackBarModule,
  MatInputModule,
>>>>>>> 337b481e7823cdb379c82691640802025d0e912e
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
