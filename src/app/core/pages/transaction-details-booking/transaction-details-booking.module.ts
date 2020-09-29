import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailsBookingPageRoutingModule } from './transaction-details-booking-routing.module';

import { TransactionDetailsBookingPage } from './transaction-details-booking.page';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionDetailsBookingPageRoutingModule,
    NgCalendarModule,
  ],
  declarations: [TransactionDetailsBookingPage],
})
export class TransactionDetailsBookingPageModule {}
