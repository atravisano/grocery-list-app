import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grocery-item',
  templateUrl: './grocery-item.component.html',
  styleUrls: ['./grocery-item.component.scss']
})
export class GroceryItemComponent implements OnInit {
  public isChecked = false;

  constructor() { }

  ngOnInit(): void {
  }

  public checked(isChecked: boolean) {
    this.isChecked = isChecked;
  }

}