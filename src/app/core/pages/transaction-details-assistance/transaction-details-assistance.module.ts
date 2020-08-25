import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionDetailsAssistancePageRoutingModule } from './transaction-details-assistance-routing.module';

import { TransactionDetailsAssistancePage } from './transaction-details-assistance.page';
import { AgmOverlays } from 'agm-overlays';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionDetailsAssistancePageRoutingModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08',
      libraries: ['geometry', 'places'],
    }),
    AgmDirectionModule,
    IonicRatingModule,
  ],
  declarations: [TransactionDetailsAssistancePage],
})
export class TransactionDetailsAssistancePageModule {}
