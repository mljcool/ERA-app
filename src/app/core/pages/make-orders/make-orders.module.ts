import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeOrdersPageRoutingModule } from './make-orders-routing.module';

import { MakeOrdersPage } from './make-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeOrdersPageRoutingModule
  ],
  declarations: [MakeOrdersPage]
})
export class MakeOrdersPageModule {}
