import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleModel } from 'src/app/models/vehicle.mode';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { VehiclesService } from 'src/app/services/vehicles/vehicles.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-vregform',
  templateUrl: './vregform.component.html',
  styleUrls: ['./vregform.component.scss'],
})
export class VregformComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicle: VehicleModel;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private googleStorageUser: StoragUserDataService,
    private vehiclesService: VehiclesService,
    public alertController: AlertController,
    private router: Router
  ) {

    this.vehicleForm = this.formBuilder.group({
      plateNumber: ['', Validators.required],
      model: ['', Validators.required],
      modelYear: ['', Validators.required],
      color: ['', Validators.required],
      fuelType: ['', Validators.required],
    });
  }

  ngOnInit() { }

  saveData() {
    this.googleStorageUser.getObjectGoogleUsers().then(data => {
      if (data) {
        this.isLoading = true;
        const params = {
          id: data.id,
          ...this.vehicleForm.getRawValue()
        };
        this.vehiclesService.regVehicles(params).then((response) => {
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
      subHeader: 'Registered',
      message: 'You successfully registere your vehicle info.',
      buttons: [{
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
          this.router.navigate(['/side-bar/main-menus']);
        }
      }]
    });

    await alert.present();
  }

}
