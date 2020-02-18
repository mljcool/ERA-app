import { Component, OnInit } from '@angular/core';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { VehicleModel } from 'src/app/models/vehicle.mode';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.page.html',
  styleUrls: ['./vehicles.page.scss']
})
export class VehiclesPage implements OnInit {
  isLoading = false;
  isExist = false;
  VehicleModel: VehicleModel;
  constructor(
    private googleStorageUser: StoragUserDataService,
    private vehiclesService: VehiclesService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.googleStorageUser.getObjectGoogleUsers().then(data => {
      if (data) {
        this.vehiclesService.getVehicleInfo(data.id).then(vehicleInfo => {
          console.log(vehicleInfo.data());
          this.VehicleModel = vehicleInfo.data();
          this.isExist = vehicleInfo.exists;
          this.isLoading = false;
        });
      }
    });

  }
}
