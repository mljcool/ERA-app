import { Component, OnInit } from '@angular/core';
import { AutoShopServicesService } from 'src/app/services/autoshop/auto-shop-services.service';
import { map } from 'rxjs/operators';
import { IAutoShop } from 'src/app/models/autoShop.model';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { BookingTypePage } from 'src/app/modals/booking-type/booking-type.page';

@Component({
  selector: 'app-auto-shops',
  templateUrl: './auto-shops.page.html',
  styleUrls: ['./auto-shops.page.scss']
})
export class AutoShopsPage implements OnInit {
  public searchTerm = '';
  shopLists: IAutoShop[];
  shops: any[];
  copyShops: any[];
  isLoading = true;

  constructor(
    private autoShopSrvc: AutoShopServicesService,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.autoShopSrvc.getAuthoShopList().subscribe(shopLists => {
      this.shopLists = shopLists;
      this.shops = this.copyShops = shopLists;
      if (this.shopLists.length >= 1) {
        this.isLoading = false;
      }
      console.log(shopLists);
    });
  }

  setFilteredItems(search: string): void {
    const searchTerm = search.toLowerCase();
    console.log(search);
    if (searchTerm !== '') {
      const copyShops = this.shops.filter(service => {
        return service.mainName.toLowerCase().includes(searchTerm);
      });
      this.shopLists = [...copyShops];
    } else {
      console.log('here');
      this.shopLists = this.copyShops;
    }
  }

  presentActionSheet(data: any) {
    const shopData = data;
    this.openTypeOfBooking(shopData);

  }

  proceedToShop(param: IAutoShop, url: string): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: param.uid,
        navigationId: 3
      }
    };
    this.router.navigate(
      [`/side-bar/${url}`],
      navigationExtras
    );
  }

  async openTypeOfBooking(shopData) {

    const modal = await this.modalCtrl.create({
      component: BookingTypePage,
      cssClass: 'booking-type-modal'
    });
    modal.onWillDismiss().then(({ data }) => {
      const urlType = data.id === 1 ? 'carservices' : 'shopping-cart';
      this.proceedToShop(shopData, urlType);
    });
    modal.present();
  }


}
