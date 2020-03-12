import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { VehicleModel } from 'src/app/models/vehicle.mode';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { InterVehicleModel, VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pick-vehicle',
  templateUrl: './pick-vehicle.page.html',
  styleUrls: ['./pick-vehicle.page.scss'],
})
export class PickVehiclePage implements OnInit, OnDestroy {
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
      });
  }

  selectVehicles(data: VehicleModel): void {
    this.modalCtrl.dismiss({
       ...data
  });
  }



}
