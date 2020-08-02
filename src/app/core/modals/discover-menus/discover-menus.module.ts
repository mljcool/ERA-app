import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscoverMenusPageRoutingModule } from './discover-menus-routing.module';

import { DiscoverMenusPage } from './discover-menus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscoverMenusPageRoutingModule
  ],
  declarations: [DiscoverMenusPage]
})
export class DiscoverMenusPageModule {}
