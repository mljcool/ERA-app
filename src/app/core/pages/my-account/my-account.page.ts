import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAccountDetails,
  writeUserData,
  saveMobileNumber,
} from '../../configs/firebaseRef/UserCore';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { ModalController, IonInput, ToastController } from '@ionic/angular';
import { LoctionPickerPage } from 'src/app/modals/loction-picker/loction-picker.page';
import { darkTheme } from '../../map-theme/dark';
import { myMarker } from '../../util/map-styles';
import { Subject } from 'rxjs';
import { MyCarsCoreService } from '../../configs/firebaseRef/MyCarsCore';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {
  userData: any = {
    mobileNumber: 'N/A',
  };

  lat = 7.05198;
  lng = 125.571784;
  zoom = 15;
  isOnlyNearest = false;
  mapThemeStyle = darkTheme;
  initMap = {
    latitude: this.lat,
    longitude: this.lng,
    iconUrl: myMarker,
  };

  userLocation: any = {
    iconUrl: myMarker,
  };
  myCars: any[] = [];
  isUpdate = false;
  myMobile: any;

  private unsubscribeAll: Subject<any>;
  @ViewChild('inputId', { static: false }) inputEl: IonInput;

  constructor(
    private router: Router,
    private googleStorageUser: StoragUserDataService,
    private modalCtrl: ModalController,
    private myCarSrvc: MyCarsCoreService,
    public toastController: ToastController
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() { }



  ionViewWillEnter() {
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

    this.myCarSrvc.onMyCars
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((myCars) => {
        this.myCars = myCars.filter((car) => car.insUsed);
      });
  }
  handleFirstNameValue(event) {
    console.log('eventeventeventevent', event);
  }

  async openLocationPicker() {
    const modal = await this.modalCtrl.create({
      component: LoctionPickerPage,
      componentProps: {
        title: 'Delivery Address',
      },
    });
    modal.present();
    modal.onDidDismiss().then(({ data }) => {
      console.log('Delivery Address', data);
    });
  }

  updateMobile(): void {
    if (!this.myMobile && this.isUpdate) {
      this.presentToast('Please provide your number.');
      return;
    }
    this.isUpdate = !this.isUpdate;
    if (this.isUpdate) {
      setTimeout(() => {
        this.inputEl.setFocus();
      }, 500);
    }
    if (!!this.myMobile) {
      const mobileNum = this.myMobile.toString();
      const myRegex = new RegExp(/(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/, 'g');
      if (!myRegex.test(mobileNum)) {
        this.presentToast('invalid mobile number');
        this.isUpdate = !this.isUpdate;
        return;
      }
      saveMobileNumber(this.userData.key, mobileNum).then(() => {
        this.presentToast('mobile number updated');
      });
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  ngOnDestroy(): void {
    this.isUpdate = false;
    this.myMobile = null;
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();

  }

  onBack(): void {
    this.isUpdate = false;
    this.myMobile = null;
    this.router.navigateByUrl('/main-menu');
  }
}
