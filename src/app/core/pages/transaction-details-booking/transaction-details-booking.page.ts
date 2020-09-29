import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NavController,
  ActionSheetController,
  ModalController,
} from '@ionic/angular';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { getMyBookings } from '../../configs/firebaseRef/BookingCore';
import { getAccountDetails } from '../../configs/firebaseRef/UserCore';
import { mobiscroll, MbscEventcalendarOptions } from '@mobiscroll/angular';

mobiscroll.settings = {
  theme: 'ios',
  themeVariant: 'light',
};
@Component({
  selector: 'app-transaction-details-booking',
  templateUrl: './transaction-details-booking.page.html',
  styleUrls: ['./transaction-details-booking.page.scss'],
})
export class TransactionDetailsBookingPage {
  bookings: any[] = [];
  copybookings: any[] = [];
  userData: any = {
    mobileNumber: 'N/A',
  };

  events: any[] = [];

  eventSettings: MbscEventcalendarOptions = {
    theme: 'ios',
    themeVariant: 'light',
    display: 'inline',
    view: {
      calendar: { type: 'month', labels: true },
      eventList: { type: 'month', scrollable: true },
    },
  };

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private googleStorageUser: StoragUserDataService,
    public actionSheetController: ActionSheetController,
    private http: HttpClient
  ) {}

  ionViewWillEnter() {
    // this.http
    //   .jsonp('https://trial.mobiscroll.com/events/', 'callback')
    //   .subscribe((resp: any) => {
    //     this.events = resp;
    //     console.log(this.events);
    //   });
    this.getUserData();
  }

  changeView(): void {}

  loadEvents(userUID) {
    getMyBookings(userUID).onSnapshot((snapshot) => {
      const bookings: any = snapshot.docs.map((car) => ({
        key: car.id,
        ...car.data(),
      }));
      this.bookings = bookings;
      bookings.forEach((element, index) => {
        console.log('startDate', element.startDate.toDate());
        console.log('endDate', element.endDate.toDate());
        const startDate = element.startDate.toDate();
        const endDate = element.endDate.toDate();
        const serviceName = element.serviceDetail.name;
        this.events.push({
          start: startDate,
          end: endDate,
          text: serviceName,
          color: '#56ca70',
        });
        console.log('eventSource', this.bookings);
      });
      // console.log('getMyBookings getMyBookings', bookings);
    });
  }

  getUserData(): void {
    this.googleStorageUser.getObjectGoogleUsers().then((data) => {
      getAccountDetails(data.id).onSnapshot((snapshot) => {
        const userData: any = snapshot.docs
          .map((car) => ({
            key: car.id,
            ...car.data(),
          }))
          .find((resp: any) => resp.id === data.id);
        this.userData = {
          ...this.userData,
          ...userData,
        };
        this.loadEvents(userData.userUID);
        console.log('userData userData', userData);
      });
    });
  }

  onBack(): void {
    this.router.navigate(['/main-menu']);
  }

  async onViewFilteredBy() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Show only',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Orders',
          icon: 'cart',
          handler: () => {
            this.router.navigate(['/transaction-list-orders']);
          },
        },
        {
          text: 'Appointments',
          icon: 'calendar',
          handler: () => {
            this.router.navigate(['/transaction-list-orders']);
          },
        },
        {
          text: 'Assistance',
          icon: 'car',
          handler: () => {
            this.router.navigate(['/transactions']);
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
