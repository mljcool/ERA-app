import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverShopsPageRoutingModule } from './discover-shops-routing.module';

import { DiscoverShopsPage } from './discover-shops.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverShopsPageRoutingModule
  ],
  declarations: [DiscoverShopsPage]
})
export class DiscoverShopsPageModule {}
