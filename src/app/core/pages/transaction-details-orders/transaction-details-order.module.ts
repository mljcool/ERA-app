import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailsOrderPageRoutingModule } from './transaction-details-order-routing.module';

import { TransactionDetailsOrderPage } from './transaction-details-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionDetailsOrderPageRoutingModule
  ],
  declarations: [TransactionDetailsOrderPage]
})
export class TransactionDetailsOrderPageModule {}
