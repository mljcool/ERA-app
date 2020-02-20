import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetContactInfoPage } from './set-contact-info.page';

const routes: Routes = [
  {
    path: '',
    component: SetContactInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetContactInfoPageRoutingModule {}
