import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailsBookingPageRoutingModule } from './transaction-details-booking-routing.module';

import { TransactionDetailsBookingPage } from './transaction-details-booking.page';
import { MbscModule } from '@mobiscroll/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionDetailsBookingPageRoutingModule,
    MbscModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  declarations: [TransactionDetailsBookingPage],
})
export class TransactionDetailsBookingPageModule {}
