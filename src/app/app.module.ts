import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

// ALL FIREBASE MODULES
import { AngularFireModule } from '@angular/fire';

import {
  AngularFirestoreModule,
  FirestoreSettingsToken
} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from '@angular/fire/database';
import { CartModalPageModule } from './pages/shopping-cart/cart-modal/cart-modal.module';
import { BookingTypePageModule } from './modals/booking-type/booking-type.module';
import { BookingFormPageModule } from './pages/bookings/modal/booking-form/booking-form.module';
import { ModalPreviewItemsPageModule } from './pages/list/orders/modal-preview-items/modal-preview-items.module';
import { LoctionPickerPageModule } from './modals/loction-picker/loction-picker.module';
import { SetContactInfoPageModule } from './modals/set-contact-info/set-contact-info.module';
import { ContactInfoPageModule } from './modals/contact-info/contact-info.module';
import { AddVehiclesPageModule } from './modals/add-vehicles/add-vehicles.module';
import { ViewVehiclesPageModule } from './modals/view-vehicles/view-vehicles.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CartModalPageModule,
    BookingTypePageModule,
    BookingFormPageModule,
    ModalPreviewItemsPageModule,
    LoctionPickerPageModule,
    SetContactInfoPageModule,
    ContactInfoPageModule,
    AddVehiclesPageModule,
    ViewVehiclesPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
