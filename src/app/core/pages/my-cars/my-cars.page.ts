import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AddCarsPage } from '../../modals/add-cars/add-cars.page';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { MyCarsCoreService } from '../../configs/firebaseRef/MyCarsCore';
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
    private myCarSrvc: MyCarsCoreService,
    public actionSheetController: ActionSheetController
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

  async addCar(carData = {}, isUpdate = false) {

    const modal = await this.modalCtrl.create({
      component: AddCarsPage,
      cssClass: 'cart-modal',
      componentProps: {
        carDetails: carData,
      },
    });

    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        if (isUpdate) {
          const assignNewData = { ...carData, ...data };
          this.myCarSrvc.updateMyCars(assignNewData);
          return;
        }
        this.myCarSrvc.insertNewCars(data);
      }
    });

    await modal.present();
  }


  onViewItem(carData, isUpdate) {
    this.presentActionSheet(carData, isUpdate);

  }

  async presentActionSheet(carData: ICars, isUpdate) {
    const actionSheet = await this.actionSheetController.create({
      header: carData.modelName,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Details',
        icon: 'share',
        handler: () => {
          this.addCar(carData, isUpdate);
        }
      }, {
        text: 'Make this in-used',
        icon: 'checkmark',
        handler: () => {
          this.myCarSrvc.onMakeInUsed(carData);
        }
      },
      {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      },]
    });
    await actionSheet.present();
  }
}
