import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './pages/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthPageModule),
  },
  // {
  //   path: 'side-bar',
  //   loadChildren: () =>
  //     import('./pages/side-bar/side-bar.module').then(m => m.SideBarPageModule),
  //   canLoad: [AuthGuard]
  // },
  {
    path: 'booking-type',
    loadChildren: () =>
      import('./modals/booking-type/booking-type.module').then(
        (m) => m.BookingTypePageModule
      ),
  },
  {
    path: 'booking-form',
    loadChildren: () =>
      import('./pages/bookings/modal/booking-form/booking-form.module').then(
        (m) => m.BookingFormPageModule
      ),
  },
  {
    path: 'loction-picker',
    loadChildren: () =>
      import('./modals/loction-picker/loction-picker.module').then(
        (m) => m.LoctionPickerPageModule
      ),
  },
  {
    path: 'set-contact-info',
    loadChildren: () =>
      import('./modals/set-contact-info/set-contact-info.module').then(
        (m) => m.SetContactInfoPageModule
      ),
  },
  {
    path: 'contact-info',
    loadChildren: () =>
      import('./modals/contact-info/contact-info.module').then(
        (m) => m.ContactInfoPageModule
      ),
  },
  {
    path: 'add-vehicles',
    loadChildren: () =>
      import('./modals/add-vehicles/add-vehicles.module').then(
        (m) => m.AddVehiclesPageModule
      ),
  },
  {
    path: 'view-vehicles',
    loadChildren: () =>
      import('./modals/view-vehicles/view-vehicles.module').then(
        (m) => m.ViewVehiclesPageModule
      ),
  },
  {
    path: 'pick-vehicle',
    loadChildren: () =>
      import('./modals/pick-vehicle/pick-vehicle.module').then(
        (m) => m.PickVehiclePageModule
      ),
  },
  {
    path: 'main-menu',
    loadChildren: () =>
      import('./core/pages/main-menu/main-menu.module').then(
        (m) => m.MainMenuPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'assistance',
    loadChildren: () =>
      import('./core/pages/assistance/assistance.module').then(
        (m) => m.AssistancePageModule
      ),
  },
  {
    path: 'assistance-modal',
    loadChildren: () =>
      import('./core/modals/assistance-modal/assistance-modal.module').then(
        (m) => m.AssistanceModalPageModule
      ),
  },
  {
    path: 'gmap-options',
    loadChildren: () =>
      import('./core/modals/gmap-options/gmap-options.module').then(
        (m) => m.GmapOptionsPageModule
      ),
  },
  {
    path: 'assistance-map-menus',
    loadChildren: () =>
      import(
        './core/modals/assistance-map-menus/assistance-map-menus.module'
      ).then((m) => m.AssistanceMapMenusPageModule),
  },
  {
    path: 'assistance-summaries',
    loadChildren: () =>
      import(
        './core/modals/assistance-summaries/assistance-summaries.module'
      ).then((m) => m.AssistanceSummariesPageModule),
  },
  {
    path: 'assistance-waiting',
    loadChildren: () =>
      import('./core/modals/assistance-waiting/assistance-waiting.module').then(
        (m) => m.AssistanceWaitingPageModule
      ),
  },
  {
    path: 'working-progress',
    loadChildren: () =>
      import('./core/modals/working-progress/working-progress.module').then(
        (m) => m.WorkingProgressPageModule
      ),
  },
  {
    path: 'start-rating',
    loadChildren: () =>
      import('./core/modals/star-rating/star-rating.module').then(
        (m) => m.StartRatingPageModule
      ),
  },

  {
    path: 'my-cars',
    loadChildren: () =>
      import('./core/pages/my-cars/my-cars.module').then(
        (m) => m.MyCarsPageModule
      ),
  },
  {
    path: 'add-cars',
    loadChildren: () =>
      import('./core/modals/add-cars/add-cars.module').then(
        (m) => m.AddCarsPageModule
      ),
  },
  {
    path: 'discover-shops',
    loadChildren: () =>
      import('./core/pages/discover-shops/discover-shops.module').then(
        (m) => m.DiscoverShopsPageModule
      ),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./core/pages/transactions/transactions.module').then(
        (m) => m.TransactionsPageModule
      ),
  },
  {
    path: 'gps-caution',
    loadChildren: () =>
      import('./core/modals/gps-caution/gps-caution.module').then(
        (m) => m.GpsCautionPageModule
      ),
  },
  {
    path: 'transaction-details-assistance',
    loadChildren: () =>
      import(
        './core/pages/transaction-details-assistance/transaction-details-assistance.module'
      ).then((m) => m.TransactionDetailsAssistancePageModule),
  },
  {
    path: 'transaction-details-orders',
    loadChildren: () =>
      import(
        './core/pages/transaction-details-orders/transaction-details-order.module'
      ).then((m) => m.TransactionDetailsOrderPageModule),
  },
  {
    path: 'transaction-details-booking',
    loadChildren: () =>
      import(
        './core/pages/transaction-details-booking/transaction-details-booking.module'
      ).then((m) => m.TransactionDetailsBookingPageModule),
  },
  {
    path: 'discover-menus',
    loadChildren: () =>
      import('./core/modals/discover-menus/discover-menus.module').then(
        (m) => m.DiscoverMenusPageModule
      ),
  },
  {
    path: 'make-orders',
    loadChildren: () =>
      import('./core/pages/make-orders/make-orders.module').then(
        (m) => m.MakeOrdersPageModule
      ),
  },
  {
    path: 'make-appointment',
    loadChildren: () =>
      import('./core/pages/make-appointment/make-appointment.module').then(
        (m) => m.MakeAppointmentPageModule
      ),
  },
  {
    path: 'transaction-view-appointment-details',
    loadChildren: () =>
      import(
        './core/pages/transaction-view-appointment-details/appointment-details.module'
      ).then((m) => m.AppointmentDetailsPageModule),
  },
  {
    path: 'cart-modal',
    loadChildren: () =>
      import('./core/pages/make-orders/cart-modal/cart-modal.module').then(
        (m) => m.OrdersCartModalPageModule
      ),
  },
  {
    path: 'order-summary',
    loadChildren: () =>
      import(
        './core/pages/make-orders/order-summary/order-summary.module'
      ).then((m) => m.OrderSummaryPageModule),
  },

  {
    path: 'appoinment-details',
    loadChildren: () =>
      import(
        './core/pages/make-appointment/appointment-details/appointment-details.module'
      ).then((m) => m.AppointmentDetailsPageModule),
  },
  {
    path: 'my-account',
    loadChildren: () =>
      import('./core/pages/my-account/my-account.module').then(
        (m) => m.MyAccountPageModule
      ),
  },
  {
    path: 'shop-details',
    loadChildren: () =>
      import('./core/pages/shop-details/shop-details.module').then(
        (m) => m.ShopDetailsPageModule
      ),
  },
  {
    path: 'transaction-list-orders',
    loadChildren: () =>
      import(
        './core/pages/transaction-list-orders/transaction-list-orders.module'
      ).then((m) => m.TransactionListOrdersPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
