import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceModalPageRoutingModule } from './assistance-modal-routing.module';

import { AssistanceModalPage } from './assistance-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceModalPageRoutingModule
  ],
  declarations: [AssistanceModalPage]
})
export class AssistanceModalPageModule {}
