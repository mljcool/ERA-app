import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceModalPage } from './assistance-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AssistanceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceModalPageRoutingModule {}
