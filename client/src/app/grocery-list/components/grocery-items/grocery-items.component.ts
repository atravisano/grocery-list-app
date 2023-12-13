import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySelectionList as MatSelectionList } from '@angular/material/legacy-list';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { BehaviorSubject, catchError, combineLatest, Observable, of, switchMap, take, tap } from 'rxjs';
import { SpinnerDialogComponent } from 'src/app/shared/components/spinner-dialog/spinner-dialog.component';
import { GroceryItem } from '../../models/GroceryItem';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';

@Component({
  selector: 'app-grocery-items',
  templateUrl: './grocery-items.component.html',
  styleUrls: ['./grocery-items.component.scss']
})
export class GroceryItemsComponent implements OnInit {
  @ViewChild(MatSelectionList)
  public selectionList!: MatSelectionList;

  public groceryList$!: Observable<GroceryItem[]>;
  public selectionCount$!: Observable<number>;
  private selectionCountStream = new BehaviorSubject<number>(0);

  constructor(private groceryListService: GroceryListService,
              private snackBarService: MatSnackBar,
              private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.groceryList$ = this.groceryListService.getAll()
      .pipe(
        catchError(error => {
          this.snackBarService.open('Grocery list could not load.', 'Dismiss');
          throw error;
        })
      )
    this.selectionCount$ = this.selectionCountStream.asObservable();
  }

  /**
   * Removes one or more grocery items based on the user's selection.
   */
  public removeItems(): void {
    const dialogRef = this.dialogService.open(SpinnerDialogComponent, { disableClose: true, panelClass: 'no-panel' });
    of(this.selectionList.selectedOptions.selected.map<number>(matListOption => matListOption.value))
      .pipe(
        switchMap(selectedIds =>
          combineLatest(selectedIds.map(selectedId =>
            this.groceryListService.delete(selectedId)
              .pipe(
                take(1)
              )
          ))
        ),
        tap(responses => {
          this.selectionCountStream.next(0);
          this.snackBarService.open(`${responses.length} item(s) removed.`, 'Dismiss');
        })
      ).subscribe(() => {
          this.groceryListService.refreshItems();
          dialogRef.close();
        });
  }

  /**
   * Update the selection count each time the selection list changed.
   */
  public onSelectionChange(): void {
    this.selectionCountStream.next(this.selectionList.selectedOptions.selected.length);
  }

}
