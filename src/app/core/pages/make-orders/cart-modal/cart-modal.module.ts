import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartModalPageRoutingModule } from './cart-modal-routing.module';

import { OrdersCartModalPage } from './cart-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartModalPageRoutingModule
  ],
  declarations: [OrdersCartModalPage]
})
export class OrdersCartModalPageModule { }
