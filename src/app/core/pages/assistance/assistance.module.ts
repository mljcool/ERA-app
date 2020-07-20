import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssistancePageRoutingModule } from './assistance-routing.module';

import { AssistancePage } from './assistance.page';
import { ContentDrawer } from '../../components/content-drawer/content-drawer';
import { AgmOverlays } from 'agm-overlays';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssistancePageRoutingModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08',
      libraries: ['geometry', 'places']
    }),
    AgmDirectionModule
  ],
  declarations: [AssistancePage, ContentDrawer]
})
export class AssistancePageModule { }
