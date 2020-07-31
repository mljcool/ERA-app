import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GpsCautionPageRoutingModule } from './gps-caution-routing.module';

import { GpsCautionPage } from './gps-caution.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GpsCautionPageRoutingModule
  ],
  declarations: [GpsCautionPage]
})
export class GpsCautionPageModule {}
