import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarservicesPage } from './carservices.page';

const routes: Routes = [
  {
    path: '',
    component: CarservicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarservicesPageRoutingModule {}
