import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

const material = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
