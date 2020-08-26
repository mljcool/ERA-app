import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AddCarsPage } from '../../modals/add-cars/add-cars.page';
import {
  ModalController,
  PopoverController,
  ActionSheetController,
} from '@ionic/angular';
import { AppAssistanceCoreService } from '../../configs/firebaseRef/AssistanceCore';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { assistTanceList } from 'src/app/constants/assistanceTypes';

export interface ITransactions {
  id: number;
  tName: string;
  description: string;
  tShopName: string;
  dateTransaction: string;
  tType: number;
  isArchived: boolean;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit, OnDestroy {
  searchTerm = '';
  myTransactions: ITransactions[] = [];
  copymyTransactions: ITransactions[] = [];
  assistanceListPending: any[] = [];
  isLoading: boolean = false;
  clearTimeOut: any = null;
  iconType: string[] = ['', 'cart', 'calendar', 'map'];
  nameType: string[] = ['', 'Orders', 'Booking', 'Assistance'];
  pastTransactions: any[] = [];
  services: AssistanceTypes[] = assistTanceList;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    public popoverController: PopoverController,
    public actionSheetController: ActionSheetController,
    private assistanceSrvc: AppAssistanceCoreService
  ) {
    this.populateTransactions();
    this._unsubscribeAll = new Subject();
    this.assistanceSrvc.onAssistance
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((assistanceList) => {
        const statuses = ['PENDING', 'IN-PROGRESS'];
        const statusesDone = ['DONE'];
        this.pastTransactions = assistanceList
          .filter((data) => statusesDone.includes(data.status))
          .map((datas) => {
            datas.assistanceName = this.findServiceType(datas.assistanceTypeId);
            return datas;
          });
        console.log('pastTransactions', this.pastTransactions);

        this.assistanceListPending = assistanceList
          .filter((data) => statuses.includes(data.status))
          .map((datas) => {
            datas.assistanceName = this.findServiceType(datas.assistanceTypeId);
            return datas;
          });
      });
  }

  findServiceType(ids): string {
    const srvcType = this.services.find((srvc) => srvc.id === ids).label;
    return srvcType;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.clearTimeOut = setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.clearTimeOut);
  }

  getIcon(type) {
    let icon = 'car';
    if (type === 'ASSITANCE') {
      icon = 'map';
    }
    return icon;
  }

  randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  populateTransactions(): void {
    const cars = ['', 'Shop Abarth 124', 'Shop C-HR', 'Shop M HiLux'];

    for (let index = 0; index < cars.length + 1; index++) {
      this.myTransactions.push({
        id: index,
        tName: cars[this.randomIntFromInterval(1, 3)],
        description: `
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum similique blanditiis at necessitatibus ut adipisci a modi deserunt illum aperiam vero, consequuntur nemo mollitia labore voluptatum, id pariatur perspiciatis? Facere.`,
        tShopName: 'Sample',
        dateTransaction: 'July 20, 2020',
        tType: this.randomIntFromInterval(1, 3),
        isArchived: false,
      });
    }
    this.copymyTransactions = this.myTransactions;
    console.log(this.myTransactions);
  }

  setFilteredItems(search: string = ''): void {
    const searchTerm = (search || '').toLowerCase();
    if (searchTerm !== '') {
      const copyShops = this.myTransactions.filter((cars: ITransactions) => {
        return cars.description.toLowerCase().includes(searchTerm);
      });
      this.myTransactions = [...copyShops];
    } else {
      this.myTransactions = this.copymyTransactions;
    }
  }

  onBack(): void {
    this.router.navigate(['/main-menu']);
  }

  onViewDetails(transDetails): void {
    const navigate = this.nameType[transDetails.tType].toLocaleLowerCase();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: transDetails.id,
        isFromMainMenu: 0,
      },
    };
    if (navigate === 'booking') {
      this.onBookings(transDetails);
      return;
    }
    if (navigate === 'orders') {
      this.onOrders(transDetails);
      return;
    }
    this.router.navigate(
      [`/transaction-details-${navigate}`],
      navigationExtras
    );
  }

  onViewAssistanceDetails(transDetails): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: transDetails.assistanceUId,
        isFromMainMenu: 0,
      },
    };
    this.router.navigate([`/transaction-details-assistance`], navigationExtras);
  }

  onBookings(transDetails: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        bookingId: transDetails.id,
        isViewOnly: 1,
      },
    };
    this.router.navigate(
      ['/appoinment-details/app-schedule'],
      navigationExtras
    );
  }
  onOrders(transDetails: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        orderId: transDetails.id,
        isViewOnly: 1,
      },
    };
    this.router.navigate(['/order-summary'], navigationExtras);
  }

  async addCar() {
    const modal = await this.modalCtrl.create({
      component: AddCarsPage,
      cssClass: 'cart-modal',
    });
    await modal.present();
  }
  async onViewFilteredBy() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Show only',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Orders',
          icon: 'cart',
          handler: () => {
            console.log('Delete clicked');
          },
        },
        {
          text: 'Appointments',
          icon: 'calendar',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'Assistance',
          icon: 'car',
          handler: () => {
            console.log('Play clicked');
          },
        },
      ],
    });
    await actionSheet.present();
  }
}
