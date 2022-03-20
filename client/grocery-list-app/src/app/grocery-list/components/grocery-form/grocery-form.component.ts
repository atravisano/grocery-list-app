import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-grocery-form',
  templateUrl: './grocery-form.component.html',
  styleUrls: ['./grocery-form.component.scss']
})
export class GroceryFormComponent {
  public groceryForm = this.fb.group({
    item: [null, [Validators.required, Validators.maxLength(255)]],
  });

  constructor(private fb: FormBuilder) {}

  public onSubmit(): void {
    console.log(`You added the item ${this.groceryForm.controls['item'].value} to the list.`);
    // Reset the form
    this.groceryForm.reset();
  }
}
