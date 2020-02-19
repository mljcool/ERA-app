import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'side-bar',
    loadChildren: () =>
      import('./pages/side-bar/side-bar.module').then(m => m.SideBarPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'booking-type',
    loadChildren: () => import('./modals/booking-type/booking-type.module').then(m => m.BookingTypePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
