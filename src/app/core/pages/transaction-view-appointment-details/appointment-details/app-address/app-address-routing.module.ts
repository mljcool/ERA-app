import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppAddressPage } from './app-address.page';

const routes: Routes = [
  {
    path: '',
    component: AppAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppAddressPageRoutingModule {}
