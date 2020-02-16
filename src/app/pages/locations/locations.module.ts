import { AssistanceComponent } from './../../modals/assistance/assistance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationsPageRoutingModule } from './locations-routing.module';

import { LocationsPage } from './locations.page';

import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from 'agm-overlays';
import { AgmDirectionModule } from 'agm-direction';
import { NotesComponent } from 'src/app/modals/notes/notes.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationsPageRoutingModule,
    AgmOverlays,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCM9feJhmKCUUsDv9zg6dQcYeAHEAHwM08'
    }),
    AgmDirectionModule
  ],
  declarations: [LocationsPage, AssistanceComponent, NotesComponent],
  entryComponents: [
    AssistanceComponent,
    NotesComponent
  ]
})
export class LocationsPageModule { }
