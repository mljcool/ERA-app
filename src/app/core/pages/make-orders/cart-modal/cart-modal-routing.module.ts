import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersCartModalPage } from './cart-modal.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersCartModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartModalPageRoutingModule { }
