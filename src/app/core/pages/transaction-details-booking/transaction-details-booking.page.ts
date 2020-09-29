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

@Component({
  selector: 'app-transaction-details-booking',
  templateUrl: './transaction-details-booking.page.html',
  styleUrls: ['./transaction-details-booking.page.scss'],
})
export class TransactionDetailsBookingPage {
  selectedDay = new Date();
  selectedObject;
  allDayLabel: any = '';
  eventSource = [];
  bookings: any[] = [];
  copybookings: any[] = [];
  viewTitle;
  isToday: boolean;
  calendarModes = [
    { key: 'month', value: 'Month' },
    { key: 'week', value: 'Week' },
    { key: 'day', value: 'Day' },
  ];
  calendar = {
    mode: this.calendarModes[0].key,
    currentDate: new Date(),
    queryMode: 'remote',
  }; // these are the variable used by the calendar.

  userData: any = {
    mobileNumber: 'N/A',
  };

  constructor(
    private router: Router,
    public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private googleStorageUser: StoragUserDataService,
    public actionSheetController: ActionSheetController
  ) {}

  ionViewWillEnter() {
    this.getUserData();
  }

  loadEvents(userUID) {
    let eventData: any = {
      allData: [],
    };
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

        eventData.startTime = new Date(startDate);
        eventData.endTime = new Date(endDate);
        eventData.title = element.serviceDetail.name;
        eventData.title = element.serviceDetail.name;

        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
        console.log('getMyBookings getMyBookings', this.eventSource);
      });
      console.log('getMyBookings getMyBookings', bookings);
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
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  eventSelected(event) {
    console.log('Event selected:', event);
  }

  onEventSelected(event) {
    console.log(
      'Event selected:' +
        event.startTime +
        '-' +
        event.endTime +
        ',' +
        event.title
    );
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    console.log('onTimeSelected', ev);
    this.selectedObject = ev;
    // this.openActionSheet(ev);
  }
  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();

    this.selectedDay = event;
  }

  onRangeChanged(ev) {
    console.log(
      'range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime
    );
  }
  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };

  async openActionSheet(event) {
    console.log('opening');
    const actionsheet = await this.actionSheetCtrl.create({
      header: 'Show only',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Block Date',
          handler: () => {
            console.log('Block Date Clicked: ', event);
            let d = event.selectedTime;
            //d.setHours(0, 0, 0);
            setTimeout(() => {
              this.blockDayEvent(d);
            }, 2);
          },
        },
        {
          text: 'Meet Up With',
          handler: function() {
            console.log('Meet Up With Clicked');
          },
        },
      ],
    });

    await actionsheet.present();
  }

  blockDayEvent(date) {
    let startTime = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );

    let endTime = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    );

    let events = this.eventSource;
    events.push({
      title: 'All Day ',
      startTime: startTime,
      endTime: endTime,
      allDay: true,
    });
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = events;
    });
  }

  addEvent(): void {
    // this.router
  }

  onOptionSelected($event: any) {
    console.log($event);
    //this.calendar.mode = $event
  }

  onBack(): void {}

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
