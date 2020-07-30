import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getDataShopsList } from '../../util/dummy-data';
import { myMarker } from '../../util/map-styles';
import { myMapTheme } from '../../map-theme/themeList';
import { GmapOptionsPage } from '../../modals/gmap-options/gmap-options.page';
import {
  ModalController,
  PopoverController,
  LoadingController,
} from '@ionic/angular';
import { darkTheme } from '../../map-theme/dark';
import { AssistanceMapMenusPage } from '../../modals/assistance-map-menus/assistance-map-menus.page';
import { Plugins } from '@capacitor/core';
import { calculateDistance } from 'src/app/pages/locations/utils/map.utils';
import {
  getNearestPoint,
  calculateDistanceNearest,
} from 'src/app/pages/locations/utils/nearest-location';
import { MapsAPILoader } from '@agm/core';
import { AssistanceSummariesPage } from '../../modals/assistance-summaries/assistance-summaries.page';
const { Geolocation } = Plugins;
@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {
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
  private unsubscribeAll: Subject<any>;
  public origin: any;
  public destination: any;
  public getApproximate: any;
  public getNearest: any;
  public renderOptions = {
    suppressMarkers: true,
  };
  //incase will add A to B markers
  markerOptions = {
    origin: {
      icon: {
        url: 'assets/images/svg/my-marker.svg',
        scaledSize: {
          height: 70,
          width: 60
        }
      }
    },
    destination: {
      icon: {
        url: 'assets/images/svg/guage.svg',
        scaledSize: {
          height: 70,
          width: 60
        }
      }
    },
  };

  itemsShop: any[] = [];
  itemsShopAll: any[] = [];
  serviceTypeParam: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private popoverController: PopoverController,
    private mapsApiLoader: MapsAPILoader,
    private loadingController: LoadingController
  ) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { serviceType } = params;
        this.serviceTypeParam = serviceType;
      });
    this.itemsShop = getDataShopsList();
    this.itemsShopAll = getDataShopsList();
  }

  ngOnInit() {
    this.mapsApiLoader.load().then((response) => {
      this.getMyCurrentPosition();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getCurrentPosition(): void { }

  async onViewMapThemes() {
    const modal = await this.modalCtrl.create({
      component: GmapOptionsPage,
      cssClass: 'cart-modal',
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        const { themeType } = data;
        if (!themeType) {
          this.mapThemeStyle = [];
          return;
        }
        this.mapThemeStyle = myMapTheme[themeType];
      }
    });
    await modal.present();
  }

  filterOnlyNearest() {
    if (!this.isOnlyNearest) {
      this.itemsShop = this.itemsShop.filter(shop => shop.id === this.getNearest.id);

    } else if (this.isOnlyNearest) {
      this.itemsShop = this.itemsShopAll;
      this.zoomIn();
    }
    this.isOnlyNearest = !this.isOnlyNearest;
  }
  zoomIn() {
    const interValZoom = setInterval(() => {
      this.zoom = this.zoom + 1;
      if (this.zoom > 14) {
        clearInterval(interValZoom);
      }
    }, 200);
  }


  async onAssistanceMenus(ev: any) {
    const popover = await this.popoverController.create({
      component: AssistanceMapMenusPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      componentProps: {
        isOnlyNearest: this.isOnlyNearest
      }
    });
    await popover.present();
    popover.onWillDismiss().then(({ data }) => {
      if (data) {
        const { optionType } = data;
        switch (optionType) {
          case 'theme':
            this.onViewMapThemes();
            break;
          case 'back':
            this.router.navigate(['/main-menu']);
            break;
          case 'nearest':
            this.filterOnlyNearest();
            break;
          case 'refresh':
            this.getMyCurrentPosition();
            break;
          default:
            break;
        }
      }
    });
  }


  async getMyCurrentPosition() {
    this.presentLoading();
    const coordinates = await Geolocation.getCurrentPosition();
    const { coords } = coordinates;
    if (coords) {
      setTimeout(() => {
        const myLocations = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          message: `I'm Here....`,
        };
        this.initMap = { ...this.initMap, ...myLocations };
        const { latitude, longitude } = this.initMap;
        const nearestRoute = getNearestPoint(
          { lat: latitude, long: longitude },
          this.itemsShop
        );
        this.getNearest = nearestRoute;
        this.origin = { lat: latitude, lng: longitude };
        this.destination = {
          lat: nearestRoute.location.lat,
          lng: nearestRoute.location.long,
        };

        calculateDistanceNearest(this.origin, this.destination).then(
          (result) => {
            if (result) {
              this.getApproximate = result;
              this.loadingController.dismiss();
            }
          }
        );
      }, 1000);
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Fetching location....',
      backdropDismiss: true,
    });
    await loading.present();
  }

  async viewShopDetals(shopDetails) {
    const modal = await this.modalCtrl.create({
      component: AssistanceSummariesPage,
      cssClass: 'assistance-modal',
      componentProps: {
        assistanceDetails: {
          shopDetail: shopDetails,
          serviceTypeParam: this.serviceTypeParam,
          canUpdate: true
        },
      },
    });
    await modal.present();
  }
}
