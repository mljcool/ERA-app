import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkingProgressPageRoutingModule } from './working-progress-routing.module';

import { WorkingProgressPage } from './working-progress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkingProgressPageRoutingModule
  ],
  declarations: [WorkingProgressPage]
})
export class WorkingProgressPageModule {}
