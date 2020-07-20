import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GmapOptionsPage } from './gmap-options.page';

const routes: Routes = [
  {
    path: '',
    component: GmapOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GmapOptionsPageRoutingModule {}
