import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverShopsPage } from './discover-shops.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverShopsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverShopsPageRoutingModule {}
