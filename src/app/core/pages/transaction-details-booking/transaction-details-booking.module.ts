import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailsBookingPageRoutingModule } from './transaction-details-booking-routing.module';

import { TransactionDetailsBookingPage } from './transaction-details-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionDetailsBookingPageRoutingModule
  ],
  declarations: [TransactionDetailsBookingPage]
})
export class TransactionDetailsBookingPageModule {}
