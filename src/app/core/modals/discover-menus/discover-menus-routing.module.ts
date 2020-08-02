import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscoverMenusPage } from './discover-menus.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverMenusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverMenusPageRoutingModule {}
