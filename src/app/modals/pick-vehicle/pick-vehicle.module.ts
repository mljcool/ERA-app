import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PickVehiclePageRoutingModule } from './pick-vehicle-routing.module';

import { PickVehiclePage } from './pick-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PickVehiclePageRoutingModule
  ],
  declarations: [PickVehiclePage]
})
export class PickVehiclePageModule {}
