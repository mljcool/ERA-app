import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetContactInfoPageRoutingModule } from './set-contact-info-routing.module';

import { SetContactInfoPage } from './set-contact-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetContactInfoPageRoutingModule
  ],
  declarations: [SetContactInfoPage]
})
export class SetContactInfoPageModule {}
