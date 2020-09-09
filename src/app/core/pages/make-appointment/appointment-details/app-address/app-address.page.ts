import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { darkTheme } from 'src/app/core/map-theme/dark';
import { myMarker } from 'src/app/core/util/map-styles';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getTotalRatingByShop } from 'src/app/core/configs/firebaseRef/RatingsCore';
import { ShopCoreService } from 'src/app/core/configs/firebaseRef/ShopCore';

@Component({
  selector: 'app-app-address',
  templateUrl: './app-address.page.html',
  styleUrls: ['./app-address.page.scss'],
})
export class AppAddressPage implements OnInit {
  shopId = '';
  serviceId = '';
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
  rate: any = 0;
  shopsDetails: any = {};
  private unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shopSrvc: ShopCoreService
  ) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { shopId, serviceId } = params;
        this.shopId = shopId;
        this.serviceId = serviceId;
        this.getShopDetails(shopId);
        getTotalRatingByShop(shopId).then((rate) => {
          console.log('totalRate', rate);
          this.rate = rate;
        });
      });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
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
          console.log('app-address', this.shopsDetails);
          const { latitude, longitude } = this.shopsDetails.shopLocation;

          this.initMap = {
            ...this.initMap,
            ...latitude,
            ...longitude,
          };
          // this.setLocations();
        }
      });
    }
  }

  onBack(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: this.shopId,
        serviceId: this.serviceId,
      },
    };
    this.router.navigate(['/make-appointment'], navigationExtras);
  }
}
