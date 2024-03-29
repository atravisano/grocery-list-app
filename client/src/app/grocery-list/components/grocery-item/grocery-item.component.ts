import { Component, Input } from '@angular/core';
import { GroceryItem } from '../../models/grocery-item';

@Component({
  selector: 'app-grocery-item',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.scss']
})
export class GroceryItemComponent {
  @Input()
  public groceryItem!: GroceryItem;
}
