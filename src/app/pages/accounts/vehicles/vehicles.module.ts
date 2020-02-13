import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VehiclesPageRoutingModule } from './vehicles-routing.module';

import { VehiclesPage } from './vehicles.page';
import { VregformComponent } from './register/vregform/vregform.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiclesPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [VehiclesPage, VregformComponent]
})
export class VehiclesPageModule {}
