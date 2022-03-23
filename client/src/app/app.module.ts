import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroceryFormComponent } from './grocery-list/components/grocery-form/grocery-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NavRootComponent } from './shared/components/nav-root/nav-root.component';
import { GroceryItemComponent } from './grocery-list/components/grocery-item/grocery-item.component';
import { GroceryItemsComponent } from './grocery-list/components/grocery-items/grocery-items.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { SpinnerDialogComponent } from './shared/components/spinner-dialog/spinner-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GroceryFormComponent,
    NavRootComponent,
    GroceryItemComponent,
    GroceryItemsComponent,
    SpinnerDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    LayoutModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
