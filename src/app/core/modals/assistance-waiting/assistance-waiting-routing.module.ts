import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceWaitingPage } from './assistance-waiting.page';

const routes: Routes = [
  {
    path: '',
    component: AssistanceWaitingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceWaitingPageRoutingModule {}
