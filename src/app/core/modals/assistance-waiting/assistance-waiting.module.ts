import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceWaitingPageRoutingModule } from './assistance-waiting-routing.module';

import { AssistanceWaitingPage } from './assistance-waiting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceWaitingPageRoutingModule
  ],
  declarations: [AssistanceWaitingPage]
})
export class AssistanceWaitingPageModule {}
