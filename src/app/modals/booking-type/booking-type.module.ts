import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingTypePageRoutingModule } from './booking-type-routing.module';

import { BookingTypePage } from './booking-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingTypePageRoutingModule
  ],
  declarations: [BookingTypePage]
})
export class BookingTypePageModule {}
