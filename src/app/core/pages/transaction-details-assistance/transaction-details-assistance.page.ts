import { Component, OnInit } from '@angular/core';
import { assistTanceList } from 'src/app/constants/assistanceTypes';
import { darkTheme } from '../../map-theme/dark';
import { myMarker } from '../../util/map-styles';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, zip, of } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { AppAssistanceCoreService } from '../../configs/firebaseRef/AssistanceCore';
import { ShopCoreService } from '../../configs/firebaseRef/ShopCore';
import { MyCarsCoreService } from '../../configs/firebaseRef/MyCarsCore';
import { minsToHrs } from './util';
import { ModalController, AlertController } from '@ionic/angular';
import { StarRatingModalPage } from '../../modals/star-rating/star-rating';
import { getTotalRatingByShop } from '../../configs/firebaseRef/RatingsCore';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details-assistance.page.html',
  styleUrls: ['./transaction-details-assistance.page.scss'],
})
export class TransactionDetailsAssistancePage implements OnInit {
  public origin: any;
  public destination: any;
  public renderOptions = {
    suppressMarkers: true,
  };
  assistanceType = {
    imgSrc: '',
    label: '',
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

  markerOptions = {
    origin: {
      icon: {
        url: 'assets/images/svg/my-marker.svg',
        scaledSize: {
          height: 50,
          width: 40,
        },
      },
    },
    destination: {
      icon: {
        url: 'assets/images/svg/guage.svg',
        scaledSize: {
          height: 50,
          width: 40,
        },
      },
    },
  };
  intervalHandle: any = null;
  isFromMainMenu: boolean = false;
  userData: any = {};
  shopsDetails: any = {};
  assistanceDetails: any = {};
  mechanicDetails: any = {};
  myCars: any[] = [];
  services: AssistanceTypes[] = assistTanceList;
  isLoaded = false;
  time: any = '00:00';
  rate: any = 0;

  private unsubscribeAll: Subject<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private googleStorageUser: StoragUserDataService,
    private assistanceSrvc: AppAssistanceCoreService,
    private shopSrvc: ShopCoreService,
    private myCarSrvc: MyCarsCoreService,
    private modalCtrl: ModalController,
    public alertController: AlertController
  ) {
    this.unsubscribeAll = new Subject();
    const queryParams$ = this.route.queryParams;
    const onMyCars$ = this.myCarSrvc.onMyCars;
    zip(queryParams$, onMyCars$)
      .pipe(
        takeUntil(this.unsubscribeAll),
        map(([queryParams$, onMyCars$]) => ({ queryParams$, onMyCars$ }))
      )
      .subscribe(({ queryParams$, onMyCars$ }) => {
        const { isFromMainMenu, id } = queryParams$;
        this.isFromMainMenu = !!parseInt(isFromMainMenu, 10);
        if (id) {
          this.getAssistanceDetails(id);
        }
      });
  }

  ngOnInit(): void {
    this.googleStorageUser.getObjectGoogleUsers().then((data) => {
      this.userData = data;
      this.getMyCar();
    });
  }

  getAssistanceDetails(id = '') {
    this.assistanceSrvc.getOneAssistance(id).onSnapshot((snapshot) => {
      const assistanceDetails: any = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
        serviceDetails: this.findServiceType(shop.data().assistanceTypeId),
      }));
      if (assistanceDetails.length) {
        this.assistanceDetails = assistanceDetails[0];
        this.getShopDetails(this.assistanceDetails.shopId);
        const {
          userId,
          shopId,
          mechanicId,
          timeType,
          timeValue,
        } = assistanceDetails[0];
        console.log('assistanceDetails', assistanceDetails);
        clearInterval(this.intervalHandle);
        this.getShopRating(shopId);
        this.runningTime({ timeType, timeValue });
        this.getMechanicDetails();
      }
    });
  }

  getShopRating(shopId) {
    getTotalRatingByShop(shopId).then((rate) => {
      console.log('totalRate', rate);
      this.rate = rate;
    });
  }

  getShopDetails(shopId) {
    if (shopId) {
      this.shopSrvc.getOneShops(shopId).onSnapshot((snapshot) => {
        const shopsDetails = snapshot.docs.map((shop) => ({
          key: shop.id,
          ...shop.data(),
        }));

        if (shopsDetails.length) {
          this.shopsDetails = shopsDetails[0];
          this.setLocations();
        }
      });
    }
  }

  getMyCar(): void {
    const { id } = this.userData;
    this.assistanceSrvc.getMyCar(id).onSnapshot((snapshot) => {
      const myCar: any = snapshot.docs
        .map((shop) => ({
          key: shop.id,
          ...shop.data(),
        }))
        .filter((car: any) => car.insUsed);
      console.log('myCar', myCar);
      if (myCar.length) {
        this.myCars = myCar;
      }
    });
  }

  getStatus() {
    let label = 'estimated time';
    const statuses = ['PENDING', 'IN-PROGRESS'];
    if (this.assistanceDetails.timeValue === '0') {
      label = 'Contact the mechanic directly?';
    }
    if (this.assistanceDetails.status === 'PENDING') {
      label = 'Pending';
    }
    return label;
  }

  getMechanicDetails(): void {
    const { mechanicId } = this.assistanceDetails;
    this.assistanceSrvc
      .getMechanicDetails(mechanicId)
      .onSnapshot((snapshot) => {
        const mechanicDetails: any = snapshot.docs.map((shop) => ({
          key: shop.id,
          ...shop.data(),
        }));

        if (mechanicDetails.length) {
          this.mechanicDetails = mechanicDetails[0];
          console.log('mechanicDetails', mechanicDetails);
        }
      });
  }

  runningTime({ timeType = '', timeValue }): void {
    console.log('timeType', timeType);
    console.log('timeValue', timeValue);

    let secondsRemaining;

    let minutes = 0;
    if (timeType === 'Hours') {
      minutes = minsToHrs(timeValue);
    } else {
      minutes = parseInt(timeValue);
    }

    const tick = () => {
      let min = Math.floor(secondsRemaining / 60);
      let sec: any = secondsRemaining - min * 60;
      if (sec < 10) {
        sec = '0' + sec;
      }

      let message = min.toString() + ':' + sec;
      this.time = message;
      if (secondsRemaining === 0) {
        this.time = 'Arrived!';
        clearInterval(this.intervalHandle);
      }
      secondsRemaining--;
    };
    if (isNaN(minutes)) {
      console.log('invalid time type');
      return;
    }
    secondsRemaining = minutes * 60;

    this.intervalHandle = setInterval(tick, 1000);
  }

  setLocations() {
    const { shopLocation = {} } = this.shopsDetails;
    const { userLocation = {} } = this.assistanceDetails;
    this.destination = {
      lat: shopLocation.latitude,
      lng: shopLocation.longitude,
    };
    this.origin = {
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    };
    this.isLoaded = true;
  }

  findServiceType(ids): any {
    const srvcType = this.services.find((srvc) => srvc.id === ids);
    return srvcType;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onBack(): void {
    if (this.isFromMainMenu) {
      this.router.navigate(['/main-menu']);
      return;
    }
    this.router.navigate(['/transactions']);
  }

  doneService() {
    this.presentAlert();
  }

  async onOpenStarRatingModal() {
    const { shopId, assistanceUId } = this.assistanceDetails;
    const modal = await this.modalCtrl.create({
      component: StarRatingModalPage,
      cssClass: 'rating-modal',
      componentProps: {
        details: {
          shopId,
          transactionId: assistanceUId,
          type: 'ASSITANCE',
        },
      },
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        const { key } = this.assistanceDetails;
        this.assistanceSrvc.addRatings(key, data.data).then(() => {});
        this.router.navigate(['/main-menu']);
      } else {
        this.router.navigate(['/main-menu']);
      }
    });
    await modal.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Hey ' + this.userData.name,
      message: 'How things are going?',
      buttons: [
        {
          text: 'All Good and done',
          handler: () => {
            const timer = setTimeout(() => {
              const { key } = this.assistanceDetails;
              this.assistanceSrvc.updateDoneService(key).then(() => {
                this.onOpenStarRatingModal();
              });

              clearTimeout(timer);
            }, 500);
          },
        },
      ],
    });

    await alert.present();
  }
}
