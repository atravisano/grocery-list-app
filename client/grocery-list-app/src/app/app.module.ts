import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroceryFormComponent } from './grocery-list/components/grocery-form/grocery-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { GroceryItemComponent } from './grocery-list/components/grocery-item/grocery-item.component';
import { GroceryItemsComponent } from './grocery-list/containers/grocery-items/grocery-items.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    GroceryFormComponent,
    NavigationComponent,
    GroceryItemComponent,
    GroceryItemsComponent
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
