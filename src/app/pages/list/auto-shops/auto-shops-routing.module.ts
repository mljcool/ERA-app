import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoShopsPage } from './auto-shops.page';

const routes: Routes = [
  {
    path: '',
    component: AutoShopsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoShopsPageRoutingModule {}
