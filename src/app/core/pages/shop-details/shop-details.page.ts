import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { darkTheme } from '../../map-theme/dark';
import { myMarker } from '../../util/map-styles';
import { ShopCoreService } from '../../configs/firebaseRef/ShopCore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { shopDefault } from './shop-details.model';
import { getTotalRatingByShop } from '../../configs/firebaseRef/RatingsCore';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.page.html',
  styleUrls: ['./shop-details.page.scss'],
})
export class ShopDetailsPage implements OnInit {
  public origin: any;
  public destination: any;
  shopsDetails: any = shopDefault;
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

  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shopSrvc: ShopCoreService
  ) {
    this._unsubscribeAll = new Subject();

    this.route.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => {
        const { shopId } = params;
        this.geShopDetails(shopId);
      });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  geShopDetails(shopId) {
    this.shopSrvc.onAllShops
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((shops) => {
        const shopsData = shops.find((shop) => shop.uid === shopId);
        this.shopsDetails = { ...this.shopsDetails, ...shopsData };
        this.shopsDetails.ratings = 'Loading';
        const timeOut = setTimeout(() => {
          getTotalRatingByShop(this.shopsDetails.uid).then((rate: any) => {
            this.shopsDetails.ratings = isNaN(rate) ? '0' : parseInt(rate);
            console.log('this.shopsDetails.ratings', this.shopsDetails.ratings);
          });
          clearTimeout(timeOut);
        }, 500);
        console.log(this.shopsDetails);
      });
  }

  onBack(): void {
    this.router.navigateByUrl('/main-menu');
  }

  onOrderItems(): void {
    const { uid } = this.shopsDetails;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: uid,
      },
    };
    this.router.navigate(['/make-orders'], navigationExtras);
  }

  onAppoinment(): void {
    const { uid } = this.shopsDetails;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: uid,
      },
    };
    this.router.navigate(['/make-appointment'], navigationExtras);
  }
}
