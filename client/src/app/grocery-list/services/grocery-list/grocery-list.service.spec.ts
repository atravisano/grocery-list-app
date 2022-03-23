import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { GroceryListService } from './grocery-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take } from 'rxjs';
import { GroceryItem } from '../../models/GroceryItem';

describe('GroceryListService', () => {
  let service: GroceryListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GroceryListService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should make a GET request', fakeAsync(() => {
      // Act
      service.getAll()
        .pipe(
          take(1)
        ).subscribe();
      const request = httpTestingController.expectOne(httpClient => httpClient.method === 'GET');
      request.flush([]);

      // Assert
      expect(request.request.method).toBeTruthy();
    }));
  });

  describe('create', () => {
    it('should make a POST request', fakeAsync(() => {
      // Arrange
      const itemName = 'item name';

      // Act
      service.create(itemName)
        .pipe(
          take(1)
        ).subscribe();
      const request = httpTestingController.expectOne(httpClient => httpClient.method === 'POST');
      request.flush({ status: 201, body: { id: 1, name: itemName } as GroceryItem });

      // Assert
      expect(request.request.body).toEqual({ name: itemName } as GroceryItem);
    }));
  });

  describe('delete', () => {
    it('should make a DELETE request', fakeAsync(() => {
      // Arrange
      const id = 1;

      // Act
      service.delete(id)
        .pipe(
          take(1)
        ).subscribe();
      const request = httpTestingController.expectOne(httpClient => httpClient.method === 'DELETE');
      request.flush({ status: 204 });

      // Assert
      expect(request.request.url.endsWith(id.toString())).toBeTrue();
    }));
  });

  describe('refreshItems', () => {
    it('should return an empty list twice', fakeAsync(() => {
      // Arrange
      let streamCount = 0;

      // Act
      service.getAll()
        .pipe(
          take(2)
        ).subscribe(() => streamCount++);

      const request1 = httpTestingController.expectOne(httpClient => httpClient.method === 'GET');
      request1.flush([]);
      service.refreshItems();
      const request2 = httpTestingController.expectOne(httpClient => httpClient.method === 'GET');
      request2.flush([]);

      // Assert
      expect(streamCount).toEqual(2);
    }));
  });
});
