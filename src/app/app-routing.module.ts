import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'side-bar',
    loadChildren: () => import('./pages/side-bar/side-bar.module').then(m => m.SideBarPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/accounts/user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./pages/accounts/vehicles/vehicles.module').then( m => m.VehiclesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
