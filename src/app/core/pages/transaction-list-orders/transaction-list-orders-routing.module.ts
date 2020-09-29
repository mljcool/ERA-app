import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionListOrdersPage } from './transaction-list-orders.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionListOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionListOrdersPageRoutingModule {}
