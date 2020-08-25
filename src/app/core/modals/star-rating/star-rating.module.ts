import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarRatingPageRoutingModule } from './star-rating-routing.module';

import { StarRatingModalPage } from './star-rating';
import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StarRatingPageRoutingModule,
    IonicRatingModule,
  ],
  declarations: [StarRatingModalPage],
})
export class StartRatingPageModule {}
