import { Component, OnInit } from '@angular/core';
import { assistTanceList } from 'src/app/constants/assistanceTypes';
import { darkTheme } from '../../map-theme/dark';
import { myMarker } from '../../util/map-styles';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { AppAssistanceCoreService } from '../../configs/firebaseRef/AssistanceCore';
import { ShopCoreService } from '../../configs/firebaseRef/ShopCore';

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
  isFromMainMenu: boolean = false;
  userData: any = {};
  shopsDetails: any = {};
  assistanceDetails: any = {};
  services: AssistanceTypes[] = assistTanceList;
  isLoaded = false;

  private unsubscribeAll: Subject<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private googleStorageUser: StoragUserDataService,
    private assistanceSrvc: AppAssistanceCoreService,
    private shopSrvc: ShopCoreService
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.googleStorageUser.getObjectGoogleUsers().then((data) => {
      this.userData = data;
    });

    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { isFromMainMenu, id } = params;
        this.isFromMainMenu = !!parseInt(isFromMainMenu, 10);
        if (id) {
          this.getAssistanceDetails(id);
        }
      });
  }

  getAssistanceDetails(id = '') {
    this.assistanceSrvc.getOneAssistance(id).onSnapshot((snapshot) => {
      const assistanceDetails = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
        serviceDetails: this.findServiceType(shop.data().assistanceTypeId),
      }));
      if (assistanceDetails.length) {
        this.assistanceDetails = assistanceDetails[0];
        this.getShopDetails(this.assistanceDetails.shopId);
      }
    });
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
          this.setLocations();
        }
      });
    }
  }

  setLocations() {
    const { shopLocation = {} } = this.shopsDetails;
    const { userLocation = {} } = this.assistanceDetails;
    this.destination = {
      lat: shopLocation.latitude,
      lng: shopLocation.longitude,
    };
    this.origin = {
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    };
    this.isLoaded = true;
  }

  findServiceType(ids): any {
    const srvcType = this.services.find((srvc) => srvc.id === ids);
    return srvcType;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onBack(): void {
    if (this.isFromMainMenu) {
      this.router.navigate(['/main-menu']);
      return;
    }
    this.router.navigate(['/transactions']);
  }
}
