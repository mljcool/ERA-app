import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { DiscoverMenusPage } from '../../modals/discover-menus/discover-menus.page';

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
  myCars: ICars[] = [];
  copyMyCars: ICars[] = [];
  isLoading: boolean = false;
  clearTimeOut: any = null;

  constructor(
    private router: Router,
    public popoverController: PopoverController
  ) {
    this.populateCars();
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

  populateCars(): void {
    const cars = [
      'Abarth 124',
      'Toyota C-HR',
      'Toyota HiLux',
      'Toyota Landcruiser',
    ];

    for (let index = 0; index < cars.length; index++) {
      this.myCars.push({
        id: index,
        modelName: cars[index],
        description: `Which is why, back in 2016, when Fiat released a new 124, many an eyebrow was arched`,
        plateNumber: (index + Math.random() * 10).toFixed(3).toString(),
        dateAdded: new Date(),
        isActiveUsed: true,
        color: 'red',
        fuelType: 1,
      });
    }
    this.copyMyCars = this.myCars;
    console.log(this.myCars);
  }

  setFilteredItems(search: string = ''): void {
    const searchTerm = (search || '').toLowerCase();
    if (searchTerm !== '') {
      const copyShops = this.myCars.filter((cars: ICars) => {
        return cars.modelName.toLowerCase().includes(searchTerm);
      });
      this.myCars = [...copyShops];
    } else {
      this.myCars = this.copyMyCars;
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
        if (typeMenus === 'appointment') {
          this.router.navigate([`make-${typeMenus}`]);
          return;
        }
        this.router.navigate([`make-${typeMenus}`]);
      }
    })
    await popover.present();
  }
}
