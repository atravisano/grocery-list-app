import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of, take, tap } from 'rxjs';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';

@Component({
  selector: 'app-grocery-form',
  templateUrl: './grocery-form.component.html',
  styleUrls: ['./grocery-form.component.scss']
})
export class GroceryFormComponent {
  public groceryForm = this.fb.group({
    item: [null, [Validators.maxLength(255)]],
  });
  public isLoading = false;

  constructor(private fb: FormBuilder,
              private groceryListService: GroceryListService,
              private snackBarService: MatSnackBar) {}

  /**
   * Add a grocery item to the list.
   */
  public onSubmit(): void {
    this.isLoading = true;
    this.groceryListService.create(this.groceryForm.controls['item'].value)
      .pipe(
        take(1),
        tap(() => {
          this.groceryForm.reset();
          this.groceryListService.refreshItems();
        }),
        catchError(error => {
          console.error(error);
          this.snackBarService.open('Item could not be added.', 'Dismiss')
          this.isLoading = false;
          return of({});
        })
      ).subscribe(() => this.isLoading = false);
  }
}
