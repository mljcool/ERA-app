import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutoShopsPageRoutingModule } from './auto-shops-routing.module';

import { AutoShopsPage } from './auto-shops.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutoShopsPageRoutingModule
  ],
  declarations: [AutoShopsPage]
})
export class AutoShopsPageModule {}
