import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoctionPickerPageRoutingModule } from './loction-picker-routing.module';

import { LoctionPickerPage } from './loction-picker.page';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoctionPickerPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08',
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  declarations: [LoctionPickerPage]
})
export class LoctionPickerPageModule { }
