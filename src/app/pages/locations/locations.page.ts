import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MouseEvent } from '@agm/core';
import { LoadingController } from '@ionic/angular';

const { Geolocation } = Plugins;
@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit, AfterViewInit {

  // google maps zoom level
  zoom = 18;

  // initial center position for the map
  lat = 51.673858;
  lng = 7.815982;

  myLocations: CurrentLocations;

  markers: Marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      shopName: 'Shop - 1',
      draggable: true,
      iconUrl: {
        url: 'assets/images/markers/marker-shop.png',
        scaledSize: {
          height: 50,
          width: 40
        }
      },
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      shopName: 'Shop - 2',
      draggable: false,
      iconUrl: {
        url: 'assets/images/markers/marker-shop.png',
        scaledSize: {
          height: 50,
          width: 40
        }
      },
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      shopName: 'Shop - 3',
      draggable: true,
      iconUrl: {
        url: 'assets/images/markers/marker-shop.png',
        scaledSize: {
          height: 50,
          width: 40
        }
      },
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'D',
      shopName: 'Shop - 4',
      draggable: true,
      iconUrl: {
        url: 'assets/images/markers/marker-shop.png',
        scaledSize: {
          height: 50,
          width: 40
        }
      },
    }
  ];


  public origin: any;
  public destination: any;

  public renderOptions = {
    suppressMarkers: true,
  };
  public markerOptions = {
    origin: {
      icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756617_face_512x512.png',
      opacity: 0,
    },
    destination: {
      icon: 'https://www.shareicon.net/data/32x32/2016/04/28/756626_face_512x512.png',
      opacity: 0,
    },
  };


  constructor(public loadingController: LoadingController) { }


  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getCurrentPosition();
  }

  async getCurrentPosition() {
    this.presentLoading();
    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates);
    const { coords } = coordinates;
    if (coords) {

      const maxChangeLongitude = 5 / coords.longitude;
      this.markers = this.markers.map((data) => {
        data.lat = coords.latitude;
        data.lng = coords.longitude + (.2 * Math.random() - .1) * maxChangeLongitude;
        return data;
      });

      setTimeout(() => {
        this.myLocations = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          message: `I'm Here....`,
          iconUrl: {
            url: 'assets/images/commons/blue-moving-car.gif',
            scaledSize: {
              height: 80,
              width: 110
            }
          },
        };
        this.loadingController.dismiss();
        const { latitude, longitude } = this.myLocations;
        const nearestRoute: Marker = findClosestMarker(latitude, longitude, this.markers);
        this.origin = { lat: latitude, lng: longitude };
        this.destination = { lat: nearestRoute.lat, lng: nearestRoute.lng };


      }, 1000);

    }


  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      iconUrl: {
        url: 'assets/images/markers/marker-shop.png',
        scaledSize: {
          height: 50,
          width: 50
        }
      },
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Fetching location....',
    });
    return await loading.present();
  }

}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  shopName?: string;
  draggable: boolean;
  iconUrl: CustomMarkersAndSize;
}

interface CustomMarkersAndSize {
  url: string;
  scaledSize: {
    width: number,
    height: number
  };
}

interface CurrentLocations {
  latitude: number;
  longitude: number;
  message?: string;
  iconUrl: CustomMarkersAndSize;
}

function findClosestMarker(lat1: any, lon1: any, markers = []) {
  const pi = Math.PI;
  const R = 6371;
  const distances = [];
  let closest = -1;

  for (let i = 0; i < markers.length; i++) {
    const lat2 = markers[i].lat;
    const lon2 = markers[i].lng;

    const chLat = lat2 - lat1;
    const chLon = lon2 - lon1;

    const dLat = chLat * (pi / 180);
    const dLon = chLon * (pi / 180);

    const rLat1 = lat1 * (pi / 180);
    const rLat2 = lat2 * (pi / 180);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(rLat1) * Math.cos(rLat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;

    distances[i] = d;
    if (closest === -1 || d < distances[closest]) {
      closest = i;
    }
  }

  console.log(markers[closest]);
  return markers[closest];
}

