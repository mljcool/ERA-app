import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceListPage } from './assistance-list.page';

const routes: Routes = [
  {
    path: '',
    component: AssistanceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceListPageRoutingModule {}
