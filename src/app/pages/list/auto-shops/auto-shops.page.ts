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
  isLoading = true;

  constructor(private autoShopSrvc: AutoShopServicesService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.autoShopSrvc
      .getAuthoShopList()
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))
        )
      )
      .subscribe(shopLists => {
        this.shopLists = shopLists;
        if (this.shopLists.length >= 1) {
          this.isLoading = false;
        }
        console.log(shopLists);
      });
  }

  setFilteredItems(): void {}
}
