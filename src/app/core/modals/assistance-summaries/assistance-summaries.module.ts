import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceSummariesPageRoutingModule } from './assistance-summaries-routing.module';

import { AssistanceSummariesPage } from './assistance-summaries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceSummariesPageRoutingModule
  ],
  declarations: [AssistanceSummariesPage]
})
export class AssistanceSummariesPageModule {}
