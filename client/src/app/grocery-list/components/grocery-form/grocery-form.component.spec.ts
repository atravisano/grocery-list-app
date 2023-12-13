import { waitForAsync, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { GroceryFormComponent } from './grocery-form.component';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { of, throwError } from 'rxjs';

describe('GroceryFormComponent', () => {
  let component: GroceryFormComponent;
  let fixture: ComponentFixture<GroceryFormComponent>;
  let groceryListServiceSpy: jasmine.SpyObj<GroceryListService>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryFormComponent ],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatSnackBarModule,
        MatIconModule
      ],
      providers: [{ provide: GroceryListService, useValue: jasmine.createSpyObj('GroceryListService', ['create', 'refreshItems']) }]
    }).compileComponents();

    groceryListServiceSpy = TestBed.inject(GroceryListService) as jasmine.SpyObj<GroceryListService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('should create item and reset the form', fakeAsync(() => {
      // Arrange
      const itemName = 'new item name';
      component.groceryForm.controls['item'].setValue(itemName);
      groceryListServiceSpy.create.and.returnValue(of({ id: 1, name: itemName }));
      spyOn(component.groceryForm, 'reset');

      // Act
      component.onSubmit();
      flush();

      // Assert
      expect(groceryListServiceSpy.create).toHaveBeenCalled();
      expect(component.groceryForm.reset).toHaveBeenCalled();
    }));

    it('should catch error and open snack bar message', fakeAsync(() => {
      // Arrange
      let snackBarService = TestBed.inject(MatSnackBar);
      spyOn(snackBarService, 'open')
      const itemName = 'new item name';
      component.groceryForm.controls['item'].setValue(itemName);
      groceryListServiceSpy.create.and.returnValue(throwError(() => new Error()));
      spyOn(console, 'error').and.callFake(() => null);

      // Act
      component.onSubmit();
      flush();

      // Assert
      expect(groceryListServiceSpy.create).toHaveBeenCalled();
      expect(snackBarService.open).toHaveBeenCalled();
    }));
  });
});
