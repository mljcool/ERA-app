import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMenusPageRoutingModule } from './main-menus-routing.module';

import { MainMenusPage } from './main-menus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainMenusPageRoutingModule
  ],
  declarations: [MainMenusPage]
})
export class MainMenusPageModule {}
