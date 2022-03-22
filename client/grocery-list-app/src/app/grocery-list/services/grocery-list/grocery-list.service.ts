import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroceryItem } from '../../models/GroceryItem';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private readonly baseAddress = environment.apiBaseAddress;
  private refreshStream = new BehaviorSubject<void>(undefined);

  constructor(private httpClient: HttpClient) { }

  /**
   * A list of grocery items that is updated each time the `refreshItems` method is called.
   * @see {@link refreshItems}
   * @returns List of grocery items.
   */
  public getAllGroceryItems(): Observable<GroceryItem[]> {
    return this.refreshStream.asObservable()
      .pipe(
        switchMap(() => this.httpClient.get<GroceryItem[]>(`${this.baseAddress}GroceryList`))
      )
  }

  /**
   * Add an item to grocery shopping list.
   * @param itemName Name of grocery item.
   * @returns The new grocery item.
   */
  public create(itemName: string): Observable<GroceryItem> {
    return this.httpClient.post<GroceryItem>(`${this.baseAddress}GroceryItem`, { name: itemName });
  }

  /**
   * Remove an item from the grocery shopping list.
   * @param itemId ID of the grocery item.
   */
  public delete(itemId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseAddress}GroceryItem/${itemId}`);
  }

  /**
   * Retrieves the latest list returned from `getAllGroceryItems`.
   * @see {@link getAllGroceryItems}
   */
  public refreshItems(): void {
    this.refreshStream.next();
  }
}
