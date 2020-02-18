import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { MouseEvent } from '@agm/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { MapsAPILoader } from '@agm/core';
import { AutoShopServicesService } from 'src/app/services/autoshop/auto-shop-services.service';
import { IAutoShop } from 'src/app/models/autoShop.model';
import { AssistanceComponent } from 'src/app/modals/assistance/assistance.component';
import { Marker, CurrentLocations } from './models/markers.model';
import { findClosestMarker, calculateDistance } from './utils/map.utils';

const { Geolocation } = Plugins;
@Component({
    selector: 'app-locations',
    templateUrl: './locations.page.html',
    styleUrls: ['./locations.page.scss']
})
export class LocationsPage implements OnInit {
    zoom = 18;

    getApproximate: any;

    shopLists: IAutoShop[];

    myLocations: CurrentLocations;

    markers: Marker[] = [];

    public origin: any;
    public destination: any;

    public renderOptions = {
        suppressMarkers: true
    };
     markerOptions = {
        origin: {
            opacity: 0
        },
        destination: {
            opacity: 0
        }
    };

    constructor(
        public loadingController: LoadingController,
        private mapsAPILoader: MapsAPILoader,
        private autoShopSrvc: AutoShopServicesService,
        private modalController: ModalController
    ) {}

    ngOnInit() {
        this.autoShopSrvc.getAuthoShopList().subscribe(shopLists => {
            this.shopLists = shopLists;
            if (this.shopLists.length !== 0) {
                this.markers = [];
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

    async getCurrentPosition() {
        this.presentLoading();
        const coordinates = await Geolocation.getCurrentPosition();
        const { coords } = coordinates;
        if (coords) {
            setTimeout(() => {
                this.loadingController.dismiss();

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
                calculateDistance(this.origin, this.destination, ((request, services) => {
                    services.route(request, (response, status) => {
                    console.log('status', response)
                    if (status === 'OK') {
                        const point = response.routes[0].legs[0];
                        this.getApproximate = {
                            esitamteTravelTime: point.duration.text,
                            distanceKM: point.distance.text,
                            writtenAddress: point.start_address
                        };
                    }
                    });
                }));

            }, 500);
        }
    }

    clickedMarker(label: string, index: number) {
        console.log(`clicked the marker: ${label || index}`);
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
}



