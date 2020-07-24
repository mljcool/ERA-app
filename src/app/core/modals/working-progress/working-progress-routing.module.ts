import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkingProgressPage } from './working-progress.page';

const routes: Routes = [
  {
    path: '',
    component: WorkingProgressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkingProgressPageRoutingModule {}
