import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailsOrderPageRoutingModule } from './transaction-details-order-routing.module';

import { TransactionDetailsOrderPage } from './transaction-details-order.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { AgmOverlays } from 'agm-overlays';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionDetailsOrderPageRoutingModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08',
      libraries: ['geometry', 'places'],
    }),
    AgmDirectionModule,
    IonicRatingModule,
  ],
  declarations: [TransactionDetailsOrderPage],
})
export class TransactionDetailsOrderPageModule {}
