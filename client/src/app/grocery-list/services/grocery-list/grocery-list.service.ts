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
  public getAll(): Observable<GroceryItem[]> {
    return this.refreshStream.asObservable()
      .pipe(
        switchMap(() => this.httpClient.get<GroceryItem[]>(this.getUrl()))
      )
  }

  /**
   * Add an item to grocery shopping list.
   * @param itemName Name of grocery item.
   * @returns The new grocery item.
   */
  public create(itemName: string): Observable<GroceryItem> {
    return this.httpClient.post<GroceryItem>(this.getUrl(), { name: itemName });
  }

  /**
   * Remove an item from the grocery shopping list.
   * @param itemId ID of the grocery item.
   */
  public delete(itemId: number): Observable<void> {
    return this.httpClient.delete<void>(this.getUrl(itemId.toString()));
  }

  /**
   * Retrieves the latest list returned from `getAllGroceryItems`.
   * @see {@link getAll}
   */
  public refreshItems(): void {
    this.refreshStream.next();
  }

  /**
   *
   * @param relativePath Optional relative path to the base address.
   * @example
   * // Base address is http://localhost
   * const url = this.getBaseAddress(); // http://localhost/groceries
   * const urlWithRelativePath = this.getBaseAddress('1'); // http://localhost/groceries/1
   * @returns The complete URL
   */
  private getUrl(relativePath?: string): string {
    let baseAddress = `${this.baseAddress}groceries`;
    if (relativePath) {
      baseAddress += `/${relativePath}`;
    }
    return baseAddress;
  }
}
