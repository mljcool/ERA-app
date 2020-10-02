import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppSchedulePage } from './app-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: AppSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppSchedulePageRoutingModule {}
