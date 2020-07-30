import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddCarsPage } from './add-cars.page';

const routes: Routes = [
  {
    path: '',
    component: AddCarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddCarsPageRoutingModule {}
