import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AddCarsPage } from '../../modals/add-cars/add-cars.page';
import { ModalController, PopoverController, ActionSheetController } from '@ionic/angular';

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
  isLoading: boolean = false;
  clearTimeOut: any = null;
  iconType: string[] = ['', 'cart', 'calendar', 'map'];
  nameType: string[] = ['', 'Orders', 'Booking', 'Assistance'];

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    public popoverController: PopoverController,
    public actionSheetController: ActionSheetController
  ) {
    this.populateTransactions();
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
    this.router.navigate([`/transaction-details-${navigate}`], navigationExtras);
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
      buttons: [{
        text: 'Orders',
        icon: 'cart',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Appointments',
        icon: 'calendar',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Assistance',
        icon: 'car',
        handler: () => {
          console.log('Play clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
