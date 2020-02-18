import { Component, OnInit } from '@angular/core';
import { AutoShopServicesService } from 'src/app/services/autoshop/auto-shop-services.service';
import { map } from 'rxjs/operators';
import { IAutoShop } from 'src/app/models/autoShop.model';

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

  constructor(private autoShopSrvc: AutoShopServicesService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.autoShopSrvc
      .getAuthoShopList().subscribe(shopLists => {
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
      const copyShops = this.shops.filter(
        service => {
          return service.mainName.toLowerCase().includes(searchTerm);
        }
      );
      this.shopLists = [...copyShops];
    } else {
      console.log('here');
      this.shopLists = this.copyShops;
    }
  }
}
