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
  {
    path: 'booking-form',
    loadChildren: () => import('./pages/bookings/modal/booking-form/booking-form.module').then(m => m.BookingFormPageModule)
  },
  {
    path: 'loction-picker',
    loadChildren: () => import('./modals/loction-picker/loction-picker.module').then( m => m.LoctionPickerPageModule)
  },
  {
    path: 'set-contact-info',
    loadChildren: () => import('./modals/set-contact-info/set-contact-info.module').then( m => m.SetContactInfoPageModule)
  },  {
    path: 'contact-info',
    loadChildren: () => import('./modals/contact-info/contact-info.module').then( m => m.ContactInfoPageModule)
  },
  {
    path: 'add-vehicles',
    loadChildren: () => import('./modals/add-vehicles/add-vehicles.module').then( m => m.AddVehiclesPageModule)
  },
  {
    path: 'view-vehicles',
    loadChildren: () => import('./modals/view-vehicles/view-vehicles.module').then( m => m.ViewVehiclesPageModule)
  },
  {
    path: 'pick-vehicle',
    loadChildren: () => import('./modals/pick-vehicle/pick-vehicle.module').then( m => m.PickVehiclePageModule)
  },
  {
    path: 'main-menu',
    loadChildren: () => import('./core/pages/main-menu/main-menu.module').then( m => m.MainMenuPageModule)
  },
  {
    path: 'assistance',
    loadChildren: () => import('./core/pages/assistance/assistance.module').then( m => m.AssistancePageModule)
  },
  {
    path: 'assistance-modal',
    loadChildren: () => import('./core/modals/assistance-modal/assistance-modal.module').then( m => m.AssistanceModalPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
