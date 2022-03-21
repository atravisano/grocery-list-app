import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, combineLatest, Observable, of, switchMap, take, tap } from 'rxjs';
import { SpinnerDialogComponent } from 'src/app/shared/components/spinner-dialog/spinner-dialog.component';
import { GroceryItem } from '../../models/GroceryItem';
import { GroceryListService } from '../../services/grocery-list/grocery-list.service';

@Component({
  selector: 'app-grocery-items',
  templateUrl: './grocery-items.component.html',
  styleUrls: ['./grocery-items.component.scss']
})
export class GroceryItemsComponent implements OnInit {
  @ViewChild(MatSelectionList) public selectionList!: MatSelectionList;
  public groceryList$!: Observable<GroceryItem[]>;
  public selectionCount$!: Observable<number>;
  private selectionCountStream = new BehaviorSubject<number>(0);

  constructor(private groceryListService: GroceryListService,
              private snackBarService: MatSnackBar,
              private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.groceryList$ = this.groceryListService.getAllGroceryItems();
    this.selectionCount$ = this.selectionCountStream.asObservable();
  }

  public removeItems() {
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

  public onSelectionChange(): void {
    this.selectionCountStream.next(this.selectionList.selectedOptions.selected.length);
  }

}
