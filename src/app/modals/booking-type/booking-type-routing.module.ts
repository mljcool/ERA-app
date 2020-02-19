import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingTypePage } from './booking-type.page';

const routes: Routes = [
  {
    path: '',
    component: BookingTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingTypePageRoutingModule {}
