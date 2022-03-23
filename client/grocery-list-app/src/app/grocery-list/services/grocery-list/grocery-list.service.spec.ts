import { TestBed } from '@angular/core/testing';

import { GroceryListService } from './grocery-list.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GroceryListService', () => {
  let service: GroceryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GroceryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
