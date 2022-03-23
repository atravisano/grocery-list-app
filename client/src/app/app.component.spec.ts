import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({ selector: 'app-nav-root'})
class NavRootStubComponent {}

@Component({ selector: 'app-grocery-form'})
class GroceryFormStubComponent {}

@Component({ selector: 'app-grocery-items'})
class GroceryItemsStubComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavRootStubComponent,
        GroceryFormStubComponent,
        GroceryItemsStubComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
