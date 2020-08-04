import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { darkTheme } from 'src/app/core/map-theme/dark';
import { myMarker } from 'src/app/core/util/map-styles';

@Component({
  selector: 'app-app-address',
  templateUrl: './app-address.page.html',
  styleUrls: ['./app-address.page.scss'],
})
export class AppAddressPage implements OnInit {

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

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack(): void {
    this.router.navigateByUrl('/make-appointment');
  }
}
