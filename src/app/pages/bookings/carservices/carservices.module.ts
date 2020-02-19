import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarservicesPageRoutingModule } from './carservices-routing.module';

import { CarservicesPage } from './carservices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarservicesPageRoutingModule
  ],
  declarations: [CarservicesPage]
})
export class CarservicesPageModule {}
