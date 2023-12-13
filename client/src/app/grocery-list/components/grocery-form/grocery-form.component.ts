import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
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
    // Note: `Validator.required` would typically be added here.
    // It was not added because of the input turning red after form submission by default in Angular Material.
    // To resolve this, the submit button has logic to keep form input required.
    item: [null, [Validators.maxLength(255)]],
  });
  public isLoading = false;

  constructor(private fb: UntypedFormBuilder,
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
          return of(undefined);
        })
      ).subscribe(() => this.isLoading = false);
  }
}
