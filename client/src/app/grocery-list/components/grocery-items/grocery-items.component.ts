import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, catchError, combineLatest, Observable, of, switchMap, take, tap } from 'rxjs';
import { SpinnerDialogComponent } from 'src/app/shared/components/spinner-dialog/spinner-dialog.component';
import { GroceryItem } from '../../models/grocery-item';
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
  private readonly selectionCountStream = new BehaviorSubject<number>(0);

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
    const selectedIds = this.getSelectedIds()
    combineLatest(selectedIds.map(selectedId => this.deleteItem(selectedId)))
      .pipe(
        tap(responses => {
          this.selectionCountStream.next(0);
          this.snackBarService.open(`${responses.length} item(s) removed.`, 'Dismiss');
          this.groceryListService.refreshItems();
          dialogRef.close();
        })
      ).subscribe();
  }

  /**
   * Update the selection count each time the selection list changed.
   */
  public onSelectionChange(): void {
    this.selectionCountStream.next(this.selectionList.selectedOptions.selected.length);
  }

  private getSelectedIds(): number[] {
    return this.selectionList.selectedOptions.selected.map<number>(matListOption => matListOption.value);
  }

  private deleteItem(id: number): Observable<void> {
    return this.groceryListService.delete(id)
      .pipe(
        take(1)
      )
  }
}
