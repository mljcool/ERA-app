import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StarRatingModalPage } from './star-rating';

const routes: Routes = [
  {
    path: '',
    component: StarRatingModalPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StarRatingPageRoutingModule {}
