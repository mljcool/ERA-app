import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionListOrdersPageRoutingModule } from './transaction-list-orders-routing.module';

import { TransactionListOrdersPage } from './transaction-list-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionListOrdersPageRoutingModule
  ],
  declarations: [TransactionListOrdersPage]
})
export class TransactionListOrdersPageModule {}
