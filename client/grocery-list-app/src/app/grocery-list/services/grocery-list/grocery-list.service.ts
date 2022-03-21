import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { GroceryItem } from '../../models/GroceryItem';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private readonly baseAddress = 'https://localhost:7050/'
  private refreshStream = new BehaviorSubject<void>(undefined);

  constructor(private httpClient: HttpClient) { }

  public getAllGroceryItems(): Observable<GroceryItem[]> {
    return this.refreshStream.asObservable()
      .pipe(
        switchMap(() => this.get<GroceryItem[]>('GroceryList'))
      )
  }

  public create(itemName: string): Observable<GroceryItem> {
    return this.httpClient.post<GroceryItem>(`${this.baseAddress}GroceryItem`, { name: itemName });
  }

  public refreshItems(): void {
    this.refreshStream.next();
  }

  private get<T>(relativePath: string): Observable<T>
  {
    return this.httpClient.get<T>(`${this.baseAddress}${relativePath}`)
  }
}
