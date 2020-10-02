import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppSchedulePageRoutingModule } from './app-schedule-routing.module';

import { AppSchedulePage } from './app-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppSchedulePageRoutingModule
  ],
  declarations: [AppSchedulePage]
})
export class AppSchedulePageModule {}
