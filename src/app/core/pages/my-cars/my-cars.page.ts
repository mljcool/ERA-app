import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AddCarsPage } from '../../modals/add-cars/add-cars.page';
import { ModalController } from '@ionic/angular';
import { MyCarsCoreService } from '../../configs/firebaseRef/MyCarsCore';
import { firebase } from 'src/app/core/configs/firebase/firebase.config';
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
  insUsed: boolean;
  fuelType: string;
  modelYear?: string;
  dateCreated?: any;
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

  private _unsubscribeAll: Subject<any>;

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private myCarSrvc: MyCarsCoreService
  ) {
    this._unsubscribeAll = new Subject();
    this.myCarSrvc.onMyCars
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((myCars) => {
        this.isLoading = true;
        this.myCars = myCars;
        console.log('myCars', this.myCars);
        this.clearTimeOut = setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    clearTimeout(this.clearTimeOut);
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
        carDetails: data,
      },
    });

    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        this.myCarSrvc.insertNewCars(data);
      }
    });

    await modal.present();
  }
  onViewItem(carData) {
    this.addCar(carData);
  }
}
