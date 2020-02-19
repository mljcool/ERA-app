import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPreviewItemsPage } from './modal-preview-items.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPreviewItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPreviewItemsPageRoutingModule {}
