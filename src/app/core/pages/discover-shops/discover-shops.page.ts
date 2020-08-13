import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { DiscoverMenusPage } from '../../modals/discover-menus/discover-menus.page';
import { ShopCoreService } from '../../configs/firebaseRef/ShopCore';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  selector: 'app-discover-shops',
  templateUrl: './discover-shops.page.html',
  styleUrls: ['./discover-shops.page.scss'],
})
export class DiscoverShopsPage implements OnInit, OnDestroy {
  searchTerm = '';
  allShops: any[] = [];
  copyShops: any[] = [];
  isLoading: boolean = false;
  clearTimeOut: any = null;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    public popoverController: PopoverController,
    private shopSrvc: ShopCoreService
  ) {
    this._unsubscribeAll = new Subject();
    this.isLoading = true;
    this.shopSrvc.onAllShops
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((shops) => {
        this.allShops = shops;
        this.copyShops = shops;
        this.clearTimeOut = setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    clearTimeout(this.clearTimeOut);
  }

  setFilteredItems(search: string = ''): void {
    const searchTerm = (search || '').toLowerCase();
    if (searchTerm !== '') {
      const copyShops = this.allShops.filter((shop) => {
        return shop.name.toLowerCase().includes(searchTerm);
      });
      this.allShops = [...copyShops];
    } else {
      this.allShops = this.copyShops;
    }
  }

  onBack(): void {
    this.router.navigate(['/main-menu']);
  }

  async onShopMenus(ev: any) {
    const popover = await this.popoverController.create({
      component: DiscoverMenusPage,
      event: ev,
      translucent: true,
    });
    popover.onWillDismiss().then(({ data }) => {
      console.log(data);
      if (data) {
        const { typeMenus } = data;
        this.router.navigate([`/make-${typeMenus}`]);
      }
    });
    await popover.present();
  }
}
