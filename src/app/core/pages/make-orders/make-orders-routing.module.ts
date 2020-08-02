import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeOrdersPage } from './make-orders.page';

const routes: Routes = [
  {
    path: '',
    component: MakeOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeOrdersPageRoutingModule {}
