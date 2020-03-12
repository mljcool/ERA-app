import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PickVehiclePage } from './pick-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: PickVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PickVehiclePageRoutingModule {}
