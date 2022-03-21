import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { GroceryItem } from '../../models/GroceryItem';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';

@Component({
  selector: 'app-grocery-items',
  templateUrl: './grocery-items.component.html',
  styleUrls: ['./grocery-items.component.scss']
})
export class GroceryItemsComponent implements OnInit {
  public groceryList$!: Observable<GroceryItem[]>;

  constructor(private groceryListService: GroceryListService) { }

  ngOnInit(): void {
    this.groceryList$ = this.groceryListService.getAllGroceryItems()
      .pipe(
        take(1)
      );
  }

}
