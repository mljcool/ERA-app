import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleModel } from 'src/app/models/vehicle.mode';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { VehiclesService, InterVehicleModel } from 'src/app/services/vehicles/vehicles.service';
import { AlertController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-view-details',
  templateUrl: './viewDetails.component.html',
  styleUrls: ['./viewDetails.component.scss'],
})
export class ViewRegformComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicle: VehicleModel;
  isLoading = false;
  vehicleData: InterVehicleModel;

  constructor(
    private formBuilder: FormBuilder,
    private googleStorageUser: StoragUserDataService,
    private vehiclesService: VehiclesService,
    public alertController: AlertController,
    private router: Router,
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {

    this.vehicleData = this.navParams.get('vehicleData');
    this.vehicleForm = this.formBuilder.group({
      plateNumber: [this.vehicleData.plateNumber, Validators.required],
      model: [this.vehicleData.model, Validators.required],
      modelYear: [this.vehicleData.modelYear, Validators.required],
      color: [this.vehicleData.color, Validators.required],
      fuelType: [this.vehicleData.fuelType, Validators.required],
    });
  }

  ngOnInit() { }

  updateData() {
    this.googleStorageUser.getObjectGoogleUsers().then(data => {
      if (data) {
        this.isLoading = true;
        const params = {
          id: data.id,
          key: this.vehicleData.key,
          ...this.vehicleForm.getRawValue()
        };
        this.vehiclesService.updateVehicle(params).then((response) => {
          this.isLoading = false;
          console.log(response);
          this.presentAlert();
        });
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Hello!',
      subHeader: 'Updated ' + this.vehicleData.model,
      message: 'You successfully updated your vehicle info.',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.modalCtrl.dismiss();
        }
      }]
    });

    await alert.present();
  }

}
