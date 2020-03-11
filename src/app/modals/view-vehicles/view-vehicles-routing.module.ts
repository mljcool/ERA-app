import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewVehiclesPage } from './view-vehicles.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVehiclesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewVehiclesPageRoutingModule {}
