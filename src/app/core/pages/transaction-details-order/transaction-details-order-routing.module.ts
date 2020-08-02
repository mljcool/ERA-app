import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionDetailsOrderPage } from './transaction-details-order.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionDetailsOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionDetailsOrderPageRoutingModule {}
