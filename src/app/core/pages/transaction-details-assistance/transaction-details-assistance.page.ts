import { Component, OnInit } from '@angular/core';
import { assistTanceList } from 'src/app/constants/assistanceTypes';
import { darkTheme } from '../../map-theme/dark';
import { myMarker } from '../../util/map-styles';

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
  transactionType: number = 0;

  constructor() {
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = { lat: 7.053428, lng: 125.571669 };
    this.transactionType = 1;
    this.assistanceType = assistTanceList.find(
      (assistance) => assistance.id === 1
    );
  }

  ngOnInit() { }
}
