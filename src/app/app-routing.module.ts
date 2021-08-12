import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoodComponent } from './add-food/add-food.component';
import { ListFoodComponent } from './list-food/list-food.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'list-food',
    component: ListFoodComponent
  },
  {
    path: '',
    redirectTo: 'list-food',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'list-food'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
