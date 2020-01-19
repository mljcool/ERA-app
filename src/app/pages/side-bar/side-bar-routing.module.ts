import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideBarPage } from './side-bar.page';

const routes: Routes = [
  {
    path: '',
    component: SideBarPage,
    children: [
      {
        path: 'main-menus',
        loadChildren: () =>
          import('../main-menus/main-menus.module').then(
            m => m.MainMenusPageModule
          )
      },
      {
        path: 'accounts-user',
        loadChildren: () =>
          import('../accounts/user/user.module').then(m => m.UserPageModule)
      },
      {
        path: 'accounts-vehicles',
        loadChildren: () =>
          import('../accounts/vehicles/vehicles.module').then(
            m => m.VehiclesPageModule
          )
      },
      {
        path: 'locations',
        loadChildren: () =>
          import('../locations/locations.module').then(
            m => m.LocationsPageModule
          )
      },
      {
        path: '',
        redirectTo: 'main-menus'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideBarPageRoutingModule {}
