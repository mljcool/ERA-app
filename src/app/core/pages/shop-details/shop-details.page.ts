import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { darkTheme } from '../../map-theme/dark';
import { myMarker } from '../../util/map-styles';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.page.html',
  styleUrls: ['./shop-details.page.scss'],
})
export class ShopDetailsPage implements OnInit {

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
  constructor(private router: Router) { }

  ngOnInit() { }

  onBack(): void {
    this.router.navigateByUrl('/main-menu');
  }

  onOrderItems(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: 1,
      },
    };
    this.router.navigate(['/make-orders'], navigationExtras);
  }

  onAppoinment(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: 1,
      },
    };
    this.router.navigate(['/make-appointment'], navigationExtras);
  }
}
