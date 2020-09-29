import { Component, OnInit } from '@angular/core';
import { assistTanceList } from 'src/app/constants/assistanceTypes';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { darkTheme } from 'src/app/core/map-theme/dark';
import { myMarker } from 'src/app/core/util/map-styles';
import { getMyOrdersDetails } from 'src/app/core/configs/firebaseRef/CartCore';
import { AlertController } from '@ionic/angular';
import { IProduct } from '../make-orders/Product.model';
import { CartService } from '../make-orders/order-services/make-oders.service';

@Component({
  selector: 'app-transaction-details-order',
  templateUrl: './transaction-details-order.page.html',
  styleUrls: ['./transaction-details-order.page.scss'],
})
export class TransactionDetailsOrderPage implements OnInit {
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

  hideProceedButtons = true;
  orderDetails: any = {};

  private unsubscribeAll: Subject<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
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
        const { transactionUID } = params;
        console.log('transactionUID', transactionUID);
        this.getOrderDetails(transactionUID);
      });
  }

  getOrderDetails(transactionUID): void {
    getMyOrdersDetails(transactionUID).onSnapshot((snapshot) => {
      const orderDetails = snapshot.docs.map((car) => ({
        key: car.id,
        ...car.data(),
      }));
      this.orderDetails = orderDetails[0];
      const { myCart, shopData, userData, orderType } = this.orderDetails;
      this.userData = userData;
      this.shopsDetails = shopData;
      this.cart = myCart;
      const { latitude, longitude } = this.userData.address;
      this.origin = { lat: latitude, lng: longitude };
      this.shopType = orderType === 'COD' ? true : false;
      this.getShopLocation(shopData);
      console.log('orderDetails orderDetails', this.orderDetails);
    });
  }

  getShopLocation(shopData): void {
    const { latitude, longitude } = shopData.shopLocation;
    this.destination = { lat: latitude, lng: longitude };
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

  ngOnInit(): void {
    console.log('myCart', this.cartService.cart);
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

  cancelOrder(): void {}

  onBack(): void {
    this.router.navigate(['/transaction-list-orders']);
  }
}
