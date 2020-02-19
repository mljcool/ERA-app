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
        path: 'assistance-preview',
        loadChildren: () =>
          import('../assistance/preview/preview.module').then(
            m => m.PreviewPageModule
          )
      },
      {
        path: 'assistance-list',
        loadChildren: () =>
          import('../assistance-list/assistance-list.module').then(
            m => m.AssistanceListPageModule
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
        path: 'auto-shops',
        loadChildren: () =>
          import('../list/auto-shops/auto-shops.module').then(
            m => m.AutoShopsPageModule
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
        path: 'my-bookings',
        loadChildren: () =>
          import('../list/my-bookings/my-bookings.module').then(
            m => m.MyBookingsPageModule
          )
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'shopping-cart',
        loadChildren: () => import('../shopping-cart/shopping-cart.module').then(m => m.ShoppingCartPageModule)
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
export class SideBarPageRoutingModule { }
