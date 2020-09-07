import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { darkTheme } from 'src/app/core/map-theme/dark';
import { myMarker } from 'src/app/core/util/map-styles';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-app-address',
  templateUrl: './app-address.page.html',
  styleUrls: ['./app-address.page.scss'],
})
export class AppAddressPage implements OnInit {
  shopId = '';
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

  private unsubscribeAll: Subject<any>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { shopId } = params;
        this.shopId = shopId;
      });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onBack(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: this.shopId,
      },
    };
    this.router.navigate(['/make-appointment'], navigationExtras);
  }
}
