import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';

import { GroceryItemsComponent } from './grocery-items.component';

describe('GroceryItemsComponent', () => {
  let component: GroceryItemsComponent;
  let fixture: ComponentFixture<GroceryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryItemsComponent ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        MatCardModule,
        MatIconModule
      ],
      providers: [{ provide: GroceryListService, useValue: jasmine.createSpyObj('GroceryListService', ['getAllGroceryItems', 'delete']) }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
