import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { saveBooking } from 'src/app/core/configs/firebaseRef/BookingCore';
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
  shopId = '';
  serviceId = '';

  shopsDetails: any = {};
  serviceDetail: any = {};

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
        const { shopId, serviceId } = params;
        this.shopId = shopId;
        this.serviceId = serviceId;
        this.geShopDetails(shopId);
        this.getUserData();
        this.getServiceDetails(serviceId);
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

  submitBooking(data: any): void {
    const endDate = (data || {}).startDate;
    const startDate = (data || {}).startDate;
    const time = (data || {}).time;
    const bookingData = {
      ...data,
      endDate: new Date(endDate),
      startDate: new Date(startDate),
      time: new Date(time),
      userData: this.userData,
      shopData: this.shopsDetails,
      serviceDetail: this.serviceDetail,
      userUID: this.userData.userUID,
      shopUID: this.shopsDetails.uid,
      serviceId: this.serviceId,
    };
    saveBooking(bookingData).then(() => {
      this.presentAlert();
      this.hideProceedButtons = true;
    });
    console.log('submitBooking', data);
  }

  getServiceDetails(serviceId): void {
    getService(serviceId).onSnapshot((snapshot) => {
      const serviceDetail = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }));

      if (serviceDetail.length) {
        this.serviceDetail = serviceDetail[0];
      }
    });
  }

  getUserData(): void {
    this.googleStorageUser.getObjectGoogleUsers().then((data) => {
      getAccountDetails(data.id).onSnapshot((snapshot) => {
        const userData = snapshot.docs
          .map((car) => ({
            key: car.id,
            ...car.data(),
          }))
          .find((resp: any) => resp.id === data.id);
        this.userData = {
          ...this.userData,
          ...userData,
        };
        console.log('userData userData', userData);
      });
    });
  }

  geShopDetails(shopId) {
    getShopDetails(shopId).onSnapshot((snapshot) => {
      const shopData: any =
        snapshot.docs.map((users) => ({
          key: users.id,
          ...users.data(),
        }))[0] || {};
      this.shopsDetails = { ...this.shopsDetails, ...shopData };
    });
  }

  onBack(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: this.shopId,
        serviceId: this.serviceId,
      },
    };

    if (!this.isViewOnly) {
      this.router.navigate(['/make-appointment'], navigationExtras);
      return;
    }
    this.router.navigateByUrl('/transactions');
  }
}
