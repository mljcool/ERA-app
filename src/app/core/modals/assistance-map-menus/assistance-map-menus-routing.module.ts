import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceMapMenusPage } from './assistance-map-menus.page';

const routes: Routes = [
  {
    path: '',
    component: AssistanceMapMenusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssistanceMapMenusPageRoutingModule {}
