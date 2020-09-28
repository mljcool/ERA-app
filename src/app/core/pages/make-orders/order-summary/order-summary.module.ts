import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderSummaryPageRoutingModule } from './order-summary-routing.module';
import { OrderSummaryPage } from './order-summary.page';
import { AgmOverlays } from 'agm-overlays';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderSummaryPageRoutingModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08',
      libraries: ['geometry', 'places'],
    }),
    AgmDirectionModule,
    IonicRatingModule,
  ],
  declarations: [OrderSummaryPage],
})
export class OrderSummaryPageModule {}
