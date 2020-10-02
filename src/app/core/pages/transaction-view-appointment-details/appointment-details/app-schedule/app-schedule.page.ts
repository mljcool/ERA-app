import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  getMyBookingDetails,
  saveBooking,
} from 'src/app/core/configs/firebaseRef/BookingCore';
import { getShopDetails } from 'src/app/core/configs/firebaseRef/ShopDetailCore';
import { getService } from 'src/app/core/configs/firebaseRef/ShopServicesCore';
import { getAccountDetails } from 'src/app/core/configs/firebaseRef/UserCore';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';

@Component({
  selector: 'app-app-schedule',
  templateUrl: './app-schedule.page.html',
  styleUrls: ['./app-schedule.page.scss'],
})
export class AppSchedulePage implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  minDate: string = new Date().toISOString();
  isSubmitting = false;
  bookingData: any = {};
  servicesData: any;
  isViewOnly = false;
  hideProceedButtons = false;
  bookingUID = '';

  bookingDetails: any = {
    startDate: {
      toDate: () => {
        return new Date();
      },
    },
    dateCreated: {
      toDate: () => {
        return new Date();
      },
    },
    time: {
      toDate: () => {
        return new Date();
      },
    },
  };

  userData: any = {
    mobileNumber: 'N/A',
  };

  /**
   * START LIFE CYCLE
   * @param {START LIFE CYCLE}
   */

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private googleStorageUser: StoragUserDataService
  ) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { bookingUID } = params;
        this.bookingUID = bookingUID;
        this.getMyBookingDetails(bookingUID);
      });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // PUBLIC FUNTIONS HERE ----------------

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Saved',
      message: 'Your booking successfully added',
      buttons: ['OK'],
    });

    await alert.present();
  }

  submitBooking(data: any): void {}

  getMyBookingDetails(bookingUID): void {
    getMyBookingDetails(bookingUID).onSnapshot((snapshot) => {
      const bookingDetails = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }))[0];
      this.bookingDetails = { ...this.bookingDetails, ...bookingDetails };
      console.log('this.bookingDetails', this.bookingDetails);
    });
  }

  onBack(): void {
    this.router.navigateByUrl('/transaction-details-booking');
  }
}
