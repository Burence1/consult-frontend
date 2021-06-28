import { MatGridListModule } from '@angular/material/grid-list';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatBadge, MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

const material = [
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSidenavModule,
  MatCarouselModule.forRoot(),
  MatToolbarModule,
  MatBadgeModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatSnackBarModule,
  MatDividerModule,
  MatGridListModule,
  MatExpansionModule
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
