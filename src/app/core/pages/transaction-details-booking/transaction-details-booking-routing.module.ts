import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionDetailsBookingPage } from './transaction-details-booking.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionDetailsBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionDetailsBookingPageRoutingModule {}
