import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppAddressPageRoutingModule } from './app-address-routing.module';

import { AppAddressPage } from './app-address.page';
import { AgmOverlays } from 'agm-overlays';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppAddressPageRoutingModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08',
      libraries: ['geometry', 'places']
    }),
    AgmDirectionModule
  ],
  declarations: [AppAddressPage]
})
export class AppAddressPageModule { }
