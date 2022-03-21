import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroceryItem } from '../../models/GroceryItem';

@Injectable({
  providedIn: 'root'
})
export class GroceryListService {
  private readonly baseAddress = 'https://localhost:7050/'

  constructor(private httpClient: HttpClient) { }

  public getAllGroceryItems() {
    return this.get<GroceryItem[]>('GroceryList');
  }

  // create endpoint - /GroceryItem

  private get<T>(relativePath: string): Observable<T>
  {
    return this.httpClient.get<T>(`${this.baseAddress}${relativePath}`)
  }
}
