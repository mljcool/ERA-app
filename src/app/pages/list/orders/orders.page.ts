import { ModalController } from '@ionic/angular';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { MyOrdersService, Orders } from './orders.service';
import { ModalPreviewItemsPage } from './modal-preview-items/modal-preview-items.page';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss']
})
export class OrdersPage implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  public searchTerm = '';
  isLoading = true;
  myOrders: Orders[] = [];
  copyMyOrders: Orders[] = [];

  constructor(
    private myOrdersSrvc: MyOrdersService,
    private googleStorageUser: StoragUserDataService,
    private modalCtrl: ModalController
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.googleStorageUser.getObjectGoogleUsers().then(userData => {
      this.onFetchBookings(userData.id);
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onFetchBookings(id: string): void {
    this.myOrdersSrvc
      .getAllOrders(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(response => {
        this.myOrders = response;
        this.copyMyOrders = response;
        this.isLoading = false;
        console.log('this.myOrders', this.myOrders);
      });
  }

  reBookNow(data: any): void { }

  async viewProd(data: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPreviewItemsPage,
      cssClass: 'cart-modal',
      componentProps: {
        products: data
      }
    });
    modal.onWillDismiss().then(() => { });
    modal.present();
  }

  setFilteredItems(search: string): void {
    const searchTerm = search.toLowerCase();
    console.log(search);
    if (searchTerm !== '') {
      const copyMyOrders = this.copyMyOrders.filter(service => {
        return service.status.toLowerCase().includes(searchTerm);
      });
      this.myOrders = [...copyMyOrders];
    } else {
      this.myOrders = this.copyMyOrders;
    }
  }
}
