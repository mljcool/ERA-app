import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  NavController,
  ActionSheetController,
  ModalController,
  AlertController,
} from '@ionic/angular';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { getMyBookings } from '../../configs/firebaseRef/BookingCore';
import { getAccountDetails } from '../../configs/firebaseRef/UserCore';
import {
  mobiscroll,
  MbscEventcalendarOptions,
  MbscEventcalendar,
} from '@mobiscroll/angular';

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

  @ViewChild('mbscList', { static: false })
  list: MbscEventcalendar;

  events: any[] = [];

  listSettings: MbscEventcalendarOptions = {
    theme: 'ios',
    themeVariant: 'light',
    display: 'inline',
    view: {
      calendar: { type: 'month', labels: true },
      eventList: { type: 'month', scrollable: true },
    },
    onEventSelect: (event, inst) => {
      // console.log('event', event);
      this.viewDetails(event);
    },
  };

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private googleStorageUser: StoragUserDataService,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) {}

  ionViewWillEnter() {
    this.getUserData();
  }

  async presentAlertConfirm(details: any = {}) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Status!',
      message: 'This Appointment already cancelled would you like to view it?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.proceedViewDetails(details);
          },
        },
      ],
    });

    await alert.present();
  }

  viewDetails(data: any = {}): void {
    const { details } = data.event;
    console.log(`I'm here......`, data);

    if (details.status === 'CANCELLED') {
      this.presentAlertConfirm(details);
      return;
    }
    this.proceedViewDetails(details);
  }

  proceedViewDetails(details: any = {}): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        bookingUID: details.bookingUID,
      },
    };
    this.router.navigate(
      ['/transaction-view-appointment-details/app-schedule'],
      navigationExtras
    );
  }

  getHexColorStatus(status) {
    let hexColor = '#ffa263';
    switch (status) {
      case 'PENDING':
        hexColor = '#ffa263';
        break;
      case 'CANCELLED':
        hexColor = '#f22222';
        break;
      case 'ACCEPTED':
        hexColor = '#56ca70';
        break;
      default:
        hexColor = '#ffa263';
    }
    return hexColor;
  }

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
        const status = element.status;
        this.events.push({
          start: startDate,
          end: endDate,
          text: serviceName + ' - ' + `(${status})`,
          color: this.getHexColorStatus(status),
          details: element,
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
