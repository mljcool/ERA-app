import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppointmentDetailsPage } from './appointment-details.page';

const routes: Routes = [
  {
    path: '',
    component: AppointmentDetailsPage,
    children: [
      {
        path: 'app-schedule',
        loadChildren: () =>
          import('./app-schedule/app-schedule.module').then(
            (m) => m.AppSchedulePageModule
          ),
      },
      {
        path: 'app-mechanics',
        loadChildren: () =>
          import('./app-mechanics/app-mechanics.module').then(
            (m) => m.AppMechanicsPageModule
          ),
      },
      {
        path: 'app-address',
        loadChildren: () =>
          import('./app-address/app-address.module').then(
            (m) => m.AppAddressPageModule
          ),
      },
      {
        path: 'app-about',
        loadChildren: () => import('./app-about/app-about.module').then(m => m.AppAboutPageModule)
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentDetailsPageRoutingModule { }
