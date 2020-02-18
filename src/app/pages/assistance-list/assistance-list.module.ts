import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistanceListPageRoutingModule } from './assistance-list-routing.module';

import { AssistanceListPage } from './assistance-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistanceListPageRoutingModule
  ],
  declarations: [AssistanceListPage]
})
export class AssistanceListPageModule {}
