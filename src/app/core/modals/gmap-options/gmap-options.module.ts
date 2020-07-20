import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GmapOptionsPageRoutingModule } from './gmap-options-routing.module';

import { GmapOptionsPage } from './gmap-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GmapOptionsPageRoutingModule
  ],
  declarations: [GmapOptionsPage]
})
export class GmapOptionsPageModule {}
