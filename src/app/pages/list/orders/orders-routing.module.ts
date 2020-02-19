import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersPage } from './orders.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  },
  {
    path: 'modal-preview-items',
    loadChildren: () => import('./modal-preview-items/modal-preview-items.module').then(m => m.ModalPreviewItemsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule { }
