import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { getMyOrders } from '../../configs/firebaseRef/CartCore';
import { getAccountDetails } from '../../configs/firebaseRef/UserCore';

@Component({
  selector: 'app-transaction-list-orders',
  templateUrl: './transaction-list-orders.page.html',
  styleUrls: ['./transaction-list-orders.page.scss'],
})
export class TransactionListOrdersPage implements OnInit {
  listPendingOrder: any[] = [];
  pastOrders: any[] = [];
  copyOders: any[] = [];
  userData: any = {};
  isLoading: boolean = false;
  searchTerm = '';

  constructor(
    private googleStorageUser: StoragUserDataService,
    public actionSheetController: ActionSheetController,
    private router: Router
  ) {
    this.getUserData();
  }

  getUserData(): void {
    this.googleStorageUser.getObjectGoogleUsers().then((data) => {
      getAccountDetails(data.id).onSnapshot((snapshot) => {
        const userData = snapshot.docs
          .map((car) => ({
            key: car.id,
            ...car.data(),
          }))
          .find((resp: any) => resp.id === data.id);
        this.userData = {
          ...this.userData,
          ...userData,
        };
        console.log('userData userData', userData);
        const { userUID } = this.userData;
        this.getmyOrders(userUID);
      });
    });
  }

  getmyOrders(uid): void {
    getMyOrders(uid).onSnapshot((snapshot) => {
      const listPendingOrder = snapshot.docs.map((car) => ({
        key: car.id,
        ...car.data(),
      }));
      this.copyOders = listPendingOrder;
      console.log('getmyOrders getmyOrders', this.copyOders);
      this.listPendingOrder = this.copyOders.filter(
        (item) => item.status === 'PENDING'
      );
      this.pastOrders = this.copyOders.filter((item) => item.status === 'DONE');
    });
  }

  ngOnInit() {}

  setFilteredItems(search): void {}

  onBack(): void {
    this.router.navigate(['/main-menu']);
  }

  onViewOrderDetailsPending(data): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        transactionUID: data.transactionUID,
      },
    };
    this.router.navigate(['/transaction-details-orders'], navigationExtras);
    console.log('pendingOrders', data);
  }

  onViewDetails(data): void {}

  async onViewFilteredBy() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Show only',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Orders',
          icon: 'cart',
          handler: () => {
            this.router.navigate(['/transaction-list-orders']);
          },
        },
        {
          text: 'Appointments',
          icon: 'calendar',
          handler: () => {
            this.router.navigate(['/transaction-details-booking']);
          },
        },
        {
          text: 'Assistance',
          icon: 'car',
          handler: () => {
            this.router.navigate(['/transactions']);
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
