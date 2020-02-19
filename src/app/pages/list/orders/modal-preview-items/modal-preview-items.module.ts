import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPreviewItemsPageRoutingModule } from './modal-preview-items-routing.module';

import { ModalPreviewItemsPage } from './modal-preview-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPreviewItemsPageRoutingModule
  ],
  declarations: [ModalPreviewItemsPage]
})
export class ModalPreviewItemsPageModule {}
