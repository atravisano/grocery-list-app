import { Component, Input } from '@angular/core';
import { GroceryItem } from '../../models/GroceryItem';

@Component({
  selector: 'app-grocery-item',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.scss']
})
export class GroceryItemComponent {
  @Input()
  public groceryItem!: GroceryItem;
  public isChecked = false;

  constructor() { }

  public checked(isChecked: boolean) {
    this.isChecked = isChecked;
  }

}
