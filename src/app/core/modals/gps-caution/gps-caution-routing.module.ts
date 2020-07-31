import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GpsCautionPage } from './gps-caution.page';

const routes: Routes = [
  {
    path: '',
    component: GpsCautionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GpsCautionPageRoutingModule {}
