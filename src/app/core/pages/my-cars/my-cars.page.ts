import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AddCarsPage } from '../../modals/add-cars/add-cars.page';
import { ModalController } from '@ionic/angular';

export interface ICars {
  id: number;
  modelName: string;
  description: string;
  plateNumber: string,
  dateAdded: any;
  color: string;
  isActiveUsed: boolean;
  fuelType: string;
  modelYear?: string;
}

@Component({
  selector: 'app-my-cars',
  templateUrl: './my-cars.page.html',
  styleUrls: ['./my-cars.page.scss'],
})
export class MyCarsPage implements OnInit, OnDestroy {
  searchTerm = '';
  myCars: ICars[] = [];
  copyMyCars: ICars[] = [];
  isLoading: boolean = false;
  clearTimeOut: any = null;


  constructor(private router: Router, private modalCtrl: ModalController) {
    this.populateCars();
  }

  ngOnInit(): void {
    this.isLoading = true
    this.clearTimeOut = setTimeout(() => {
      this.isLoading = false;
    }, 1500);
  }

  ngOnDestroy(): void {
    clearTimeout(this.clearTimeOut);
  }


  populateCars(): void {
    const cars = ['Abarth 124', 'Toyota C-HR', 'Toyota HiLux', 'Toyota Landcruiser'];

    for (let index = 0; index < cars.length; index++) {
      this.myCars.push({
        id: index,
        modelName: cars[index],
        description: `Which is why, back in 2016, when Fiat released a new 124, many an eyebrow was arched`,
        plateNumber: (index + Math.random() * 10).toFixed(3).toString(),
        dateAdded: new Date(),
        modelYear: '2011',
        isActiveUsed: true,
        color: 'red',
        fuelType: 'G',

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

  async addCar(data = {}) {
    const modal = await this.modalCtrl.create({
      component: AddCarsPage,
      cssClass: 'cart-modal',
      componentProps: {
        carDetails: data
      }
    });
    await modal.present();
  }
  onViewItem(carData) {
    this.addCar(carData);
  }
}
