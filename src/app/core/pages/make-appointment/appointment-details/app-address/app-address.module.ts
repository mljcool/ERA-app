import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppAddressPageRoutingModule } from './app-address-routing.module';

import { AppAddressPage } from './app-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppAddressPageRoutingModule
  ],
  declarations: [AppAddressPage]
})
export class AppAddressPageModule {}
