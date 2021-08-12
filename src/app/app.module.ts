import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddFoodComponent } from './add-food/add-food.component';
import { MatListModule } from '@angular/material/list';
import { FoodService } from './services/food.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ListFoodComponent } from './list-food/list-food.component';
import { ShopComponent } from './shop/shop.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FoodFormComponent } from './food-form/food-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { ForSaleService } from './services/forSale.service';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    AddFoodComponent,
    ListFoodComponent,
    ShopComponent,
    PageNotFoundComponent,
    FoodFormComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDividerModule,
    MatIconModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  providers: [FoodService, ForSaleService],
  bootstrap: [AppComponent],
  entryComponents: [AddFoodComponent, FoodFormComponent, AlertComponent],
})
export class AppModule {}
