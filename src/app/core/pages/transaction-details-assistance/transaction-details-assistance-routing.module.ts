import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionDetailsAssistancePage } from './transaction-details-assistance.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionDetailsAssistancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionDetailsAssistancePageRoutingModule { }
