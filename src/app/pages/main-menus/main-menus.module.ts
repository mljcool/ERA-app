import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMenusPageRoutingModule } from './main-menus-routing.module';

import { MainMenusPage } from './main-menus.page';
import { WipComponent } from 'src/app/modals/wip/wip.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainMenusPageRoutingModule
  ],
  declarations: [MainMenusPage, WipComponent],
  entryComponents: [WipComponent]
})
export class MainMenusPageModule {}
