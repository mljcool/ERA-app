import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewVehiclesPageRoutingModule } from './view-vehicles-routing.module';

import { ViewVehiclesPage } from './view-vehicles.page';
import { SharedModule } from 'src/app/sharedModules/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewVehiclesPageRoutingModule,
    SharedModule
  ],
  declarations: [ViewVehiclesPage]
})
export class ViewVehiclesPageModule {}
