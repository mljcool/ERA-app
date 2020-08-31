import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMenuPageRoutingModule } from './main-menu-routing.module';

import { MainMenuPage } from './main-menu.page';
import { PopoverComponent } from 'src/app/common-ui/PopoverMenu/pop-over-menu.component';
import { ServicesSharedModule } from '../../global/SharedSerivces';
import { StarRatingComponent } from '../../components/star-ratinng/star-rating';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainMenuPageRoutingModule,
    ServicesSharedModule.forRoot(),
    IonicRatingModule,
  ],
  declarations: [MainMenuPage, PopoverComponent, StarRatingComponent],
  entryComponents: [PopoverComponent],
})
export class MainMenuPageModule {}
