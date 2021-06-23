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
  MatTabsModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
