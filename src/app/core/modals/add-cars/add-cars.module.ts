import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCarsPageRoutingModule } from './add-cars-routing.module';

import { AddCarsPage } from './add-cars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCarsPageRoutingModule
  ],
  declarations: [AddCarsPage]
})
export class AddCarsPageModule { }
