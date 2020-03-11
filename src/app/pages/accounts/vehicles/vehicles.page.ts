import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { VehiclesService, InterVehicleModel } from 'src/app/services/vehicles/vehicles.service';
import { VehicleModel } from 'src/app/models/vehicle.mode';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { AddVehiclesPage } from 'src/app/modals/add-vehicles/add-vehicles.page';
import { ViewVehiclesPage } from 'src/app/modals/view-vehicles/view-vehicles.page';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss']
})
export class VehiclesPage implements OnInit, OnDestroy {
  isLoading = false;
  isExist = false;
  VehicleModel: VehicleModel;
  vehicles: InterVehicleModel[] = [];

  private unsubscribeAll: Subject<any>;

  constructor(
    private googleStorageUser: StoragUserDataService,
    private vehiclesService: VehiclesService,
    private modalCtrl: ModalController,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.isLoading = true;
    this.googleStorageUser.getObjectGoogleUsers().then(data => {
      if (data) {
        this.vehiclesService.getVehicleInfo(data.id).then(vehicleInfo => {
          console.log(vehicleInfo.data());
          this.VehicleModel = vehicleInfo.data();
          this.isExist = vehicleInfo.exists;
          this.isLoading = false;
          this.onFetchVehicles(data.id);
        });
      }
    });

  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


  onFetchVehicles(id: string): void {
    this.vehiclesService
      .getAllVehicles(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(response => {
        this.vehicles = response;
        this.isLoading = false;
        console.log('this.myOrders', this.vehicles);
      });
  }

  viewDetails(data: VehicleModel): void {
    this.modalViewVehicle(data);
  }

  addNewVehicles(): void {
    this.modalVehicle();
  }

  async modalViewVehicle(data: any) {
    const modal = await this.modalCtrl.create({
      component: ViewVehiclesPage,
      componentProps: {
        vehicleData: data
      }
    });
    modal.onWillDismiss().then(() => {

    });
    modal.present();
  }

  async modalVehicle() {
    const modal = await this.modalCtrl.create({
      component: AddVehiclesPage,
    });
    modal.onWillDismiss().then(() => {

    });
    modal.present();
  }
}
