import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { DiscoverMenusPage } from '../../modals/discover-menus/discover-menus.page';
import { getShopServices } from '../../configs/firebaseRef/ShopServicesCore';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface ICars {
  id: number;
  modelName: string;
  description: string;
  plateNumber: string;
  dateAdded: any;
  color: string;
  isActiveUsed: boolean;
  fuelType: number;
}

@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit, OnDestroy {
  searchTerm = '';
  myCars: ICars[] = [];
  copyMyCars: ICars[] = [];
  shopService: any[] = [];
  copyShopService: any[] = [];
  isLoading: boolean = false;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public popoverController: PopoverController
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((params) => {
        const { shopId } = params;
        getShopServices(shopId).onSnapshot((snapshot) => {
          this.shopService = snapshot.docs.map((users) => ({
            key: users.id,
            ...users.data(),
          }));
          console.log(this.shopService);
          this.copyShopService = this.shopService;
        });
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  setFilteredItems(search: string = ''): void {
    const searchTerm = (search || '').toLowerCase();
    if (searchTerm !== '') {
      const copyShops = this.shopService.filter((cars: any) => {
        return cars.name.toLowerCase().includes(searchTerm);
      });
      this.shopService = [...copyShops];
    } else {
      this.shopService = this.copyShopService;
    }
  }

  onBack(): void {
    this.router.navigate(['/main-menu']);
  }

  onShopViewService(ev: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: ev.shopuid,
      },
    };
    this.router.navigate(
      ['/appoinment-details/app-schedule'],
      navigationExtras
    );
  }
}
