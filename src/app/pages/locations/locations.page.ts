import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MouseEvent } from '@agm/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';
import { AutoShopServicesService } from 'src/app/services/autoshop/auto-shop-services.service';
import { map } from 'rxjs/operators';
import { IAutoShop } from 'src/app/models/autoShop.model';
import { AssistanceComponent } from 'src/app/modals/assistance/assistance.component';

const { Geolocation } = Plugins;
@Component({
    selector: 'app-locations',
    templateUrl: './locations.page.html',
    styleUrls: ['./locations.page.scss']
})
export class LocationsPage implements OnInit, AfterViewInit {
    // google maps zoom level
    zoom = 18;

    // initial center position for the map
    lat = 51.673858;
    lng = 7.815982;
    getApproximate: any;

    shopLists: IAutoShop[];

    myLocations: CurrentLocations;

    markers: Marker[] = [];

    public origin: any;
    public destination: any;

    public renderOptions = {
        suppressMarkers: true
    };
    public markerOptions = {
        origin: {
            icon:
                'https://www.shareicon.net/data/32x32/2016/04/28/756617_face_512x512.png',
            opacity: 0
        },
        destination: {
            icon:
                'https://www.shareicon.net/data/32x32/2016/04/28/756626_face_512x512.png',
            opacity: 0
        }
    };

    constructor(
        public loadingController: LoadingController,
        private mapsAPILoader: MapsAPILoader,
        private autoShopSrvc: AutoShopServicesService,
        private modalController: ModalController
    ) {}

    ngOnInit() {}

    ionViewWillEnter() {
        this.autoShopSrvc.getAuthoShopList().subscribe(shopLists => {
            this.shopLists = shopLists;
            if (this.shopLists.length !== 0) {
                this.mapsAPILoader.load().then(() => {
                    this.getCurrentPosition();
                });
                console.log('here', shopLists);
                this.shopLists.forEach(data => {
                    this.markers.push({
                        lat: data.functionalLocation.latitude,
                        lng: data.functionalLocation.longitude,
                        label: '',
                        shopName: data.mainName,
                        draggable: false,
                        shopData: data,
                        iconUrl: {
                            url: 'assets/images/markers/marker-shop.png',
                            scaledSize: {
                                height: 50,
                                width: 40
                            }
                        }
                    });
                });
            }
        });
    }

    ngAfterViewInit(): void {}

    async getCurrentPosition() {
        this.presentLoading();
        const coordinates = await Geolocation.getCurrentPosition();
        console.log('Current', coordinates);
        const { coords } = coordinates;
        if (coords) {
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
                    }
                };
                this.loadingController.dismiss();
                const { latitude, longitude } = this.myLocations;
                const nearestRoute: Marker = findClosestMarker(
                    latitude,
                    longitude,
                    this.markers
                );
                this.origin = { lat: latitude, lng: longitude };
                this.destination = {
                    lat: nearestRoute.lat,
                    lng: nearestRoute.lng
                };
                this.calculateDistance(this.origin, this.destination);
            }, 1000);
        }
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
    }

    markerDragEnd(m: Marker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Fetching location....',
            backdropDismiss: true
        });
        return await loading.present();
    }

    async presentModal(marker: Marker) {
        const modal = await this.modalController.create({
            component: AssistanceComponent,
            componentProps: {
                shopData: marker.shopData,
                userLocation: this.myLocations,
                getApproximate: this.getApproximate
            }
        });
        return await modal.present();
    }

    calculateDistance(origin: any, to: any): number {
        console.log('origin', origin);
        console.log('to', to);
        const dist = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(origin.lat, origin.lng),
            new google.maps.LatLng(to.lat, to.lng)
        );
        const directionsService = new google.maps.DirectionsService();
        const request = {
            origin: new google.maps.LatLng(origin.lat, origin.lng), // LatLng|string
            destination: new google.maps.LatLng(to.lat, to.lng), // LatLng|string
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, (response, status) => {
            if (status === 'OK') {
                const point = response.routes[0].legs[0];
                this.getApproximate = {
                    esitamteTravelTime: point.duration.text,
                    distanceKM: point.distance.text,
                    writtenAddress: point.start_address
                };
            }
        });

        return Math.ceil(dist / 1000);
    }
}

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    shopName?: string;
    draggable: boolean;
    iconUrl: CustomMarkersAndSize;
    shopData?: IAutoShop;
}

interface CustomMarkersAndSize {
    url: string;
    scaledSize: {
        width: number;
        height: number;
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

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) *
                Math.sin(dLon / 2) *
                Math.cos(rLat1) *
                Math.cos(rLat2);
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

function getInitials(name: string) {
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}
