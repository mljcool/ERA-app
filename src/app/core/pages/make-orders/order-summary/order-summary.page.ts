import { Component, OnInit } from '@angular/core';
import { assistTanceList } from 'src/app/constants/assistanceTypes';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { darkTheme } from 'src/app/core/map-theme/dark';
import { myMarker } from 'src/app/core/util/map-styles';
import { CartService } from '../order-services/make-oders.service';
import { IProduct } from '../Product.model';
import { getTotalRatingByShop } from 'src/app/core/configs/firebaseRef/RatingsCore';
import { getShopDetails } from 'src/app/core/configs/firebaseRef/ShopDetailCore';
import { getAccountDetails } from 'src/app/core/configs/firebaseRef/UserCore';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { saveOrders } from 'src/app/core/configs/firebaseRef/CartCore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {
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
  transactionType: number = 0;
  isFromMainMenu: boolean = false;
  isViewOnly: boolean = false;
  shopType: boolean = true;
  cart: IProduct[] = [];
  shopId: string = '';
  reviews: any[] = [];
  shopsDetails: any = {
    shopLocation: {
      latitude: this.lat,
      longitude: this.lng,
    },
  };
  userData: any = {
    mobileNumber: 'N/A',
    address: {
      formattedAddres: '',
      latitude: 7.045669,
      longitude: 125.5474302,
    },
  };

  hideProceedButtons = false;

  private unsubscribeAll: Subject<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private googleStorageUser: StoragUserDataService,
    private alertController: AlertController
  ) {
    this.transactionType = 1;
    this.assistanceType = assistTanceList.find(
      (assistance) => assistance.id === 1
    );
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { isFromMainMenu, orderId, isViewOnly, shopId } = params;
        this.isViewOnly = !!parseInt(isViewOnly, 10);
        this.shopId = shopId;
        this.geShopDetails(shopId);
        this.getReviews(shopId);
        this.getUserData();
      });
  }

  getReviews(shopId: string): void {
    getTotalRatingByShop(shopId).then((rate: any) => {
      this.shopsDetails.ratings = isNaN(rate) ? '0' : parseInt(rate);
      console.log('allShopRate', this.shopsDetails.ratings);
    });
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }
  sumQty() {
    const totalQty = this.cart
      .map((item) => item.amount)
      .reduce((prev, next) => prev + next);
    return totalQty;
  }

  geShopDetails(shopId) {
    getShopDetails(shopId).onSnapshot((snapshot) => {
      const shopData: any =
        snapshot.docs.map((users) => ({
          key: users.id,
          ...users.data(),
        }))[0] || {};
      this.shopsDetails = { ...this.shopsDetails, ...shopData };
      console.log('getShopDetails', this.shopsDetails);
      const { latitude, longitude } = shopData.shopLocation;
      this.destination = { lat: latitude, lng: longitude };
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
        const { latitude, longitude } = this.userData.address;
        this.origin = { lat: latitude, lng: longitude };
        console.log('userData userData', userData);
      });
    });
  }

  ngOnInit(): void {
    console.log('myCart', this.cartService.cart);
  }
  ionViewDidEnter() {
    console.log('here1');
  }
  ionViewWillEnter() {
    console.log('here2');
    console.log('myCart', this.cartService.cart);
    console.log('shopId', this.shopId);
    this.cart = this.cartService.cart;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Saved',
      message: 'Your order successfully added',
      buttons: ['OK'],
    });

    await alert.present();
  }

  proceedOrder(): void {
    const orderTypes = this.shopType ? 'COD' : 'PICK-UP';
    const shoppingData = {
      myCart: this.cart,
      userData: this.userData,
      shopData: this.shopsDetails,
      userUID: this.userData.userUID,
      shopUID: this.shopsDetails.uid,
      orderType: orderTypes,
    };
    saveOrders(shoppingData).then(() => {
      this.presentAlert();
      this.hideProceedButtons = true;
    });
  }

  onBack(): void {
    if (this.isViewOnly) {
      this.router.navigate(['/transactions']);
      return;
    }
    this.router.navigate(['/discover-shops']);
  }
}
