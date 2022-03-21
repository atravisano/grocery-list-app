import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materialModules = [
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatToolbarModule,
  MatListModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule { }
