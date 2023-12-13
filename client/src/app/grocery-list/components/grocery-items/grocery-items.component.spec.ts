import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { catchError, of, take, throwError } from 'rxjs';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';

import { GroceryItemsComponent } from './grocery-items.component';

describe('GroceryItemsComponent', () => {
  let component: GroceryItemsComponent;
  let fixture: ComponentFixture<GroceryItemsComponent>;
  let groceryListServiceSpy: jasmine.SpyObj<GroceryListService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryItemsComponent ],
      imports: [
        MatSnackBarModule,
        MatDialogModule,
        MatCardModule,
        MatIconModule,
        MatSnackBarModule
      ],
      providers: [{ provide: GroceryListService, useValue: jasmine.createSpyObj('GroceryListService', ['getAll', 'delete']) }]
    })
    .compileComponents();

    groceryListServiceSpy = TestBed.inject(GroceryListService) as jasmine.SpyObj<GroceryListService>;
    groceryListServiceSpy.getAll.and.returnValue(of([]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should open snack if an error occurs retrieving the grocery list', fakeAsync(() => {
      // Arrange
      let snackBarService = TestBed.inject(MatSnackBar);
      spyOn(snackBarService, 'open');
      groceryListServiceSpy.getAll.and.returnValue(throwError(() => new Error()));

      // Act
      component.ngOnInit();
      component.groceryList$
        .pipe(
          take(1),
          catchError(() => of())
        ).subscribe();
      flush();

      // Assert
      expect(snackBarService.open).toHaveBeenCalled();
    }));
  })
});
