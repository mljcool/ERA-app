import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceMapMenusPageRoutingModule } from './assistance-map-menus-routing.module';

import { AssistanceMapMenusPage } from './assistance-map-menus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceMapMenusPageRoutingModule
  ],
  declarations: [AssistanceMapMenusPage]
})
export class AssistanceMapMenusPageModule {}
