import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppMechanicsPageRoutingModule } from './app-mechanics-routing.module';

import { AppMechanicsPage } from './app-mechanics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppMechanicsPageRoutingModule
  ],
  declarations: [AppMechanicsPage]
})
export class AppMechanicsPageModule {}
