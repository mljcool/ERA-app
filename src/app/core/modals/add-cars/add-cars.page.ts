import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleModel } from 'src/app/models/vehicle.mode';
import { NavParams, ModalController } from '@ionic/angular';
import { ICars } from '../../pages/my-cars/my-cars.page';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.page.html',
  styleUrls: ['./add-cars.page.scss'],
})
export class AddCarsPage implements OnInit {
  getCarDetails: ICars;
  vehicleForm: FormGroup;
  vehicle: VehicleModel;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private navParams: NavParams, private modalCtrl: ModalController) {
    this.getCarDetails = this.navParams.get('carDetails');
    console.log(this.getCarDetails);
    this.vehicleForm = this.formBuilder.group({
      plateNumber: [this.getCarDetails.plateNumber, Validators.required],
      modelName: [this.getCarDetails.modelName, Validators.required],
      modelYear: [this.getCarDetails.modelYear, Validators.required],
      description: [this.getCarDetails.description, Validators.required],
      color: [this.getCarDetails.color, Validators.required],
      fuelType: [this.getCarDetails.fuelType, Validators.required],
    });
  }

  ngOnInit() { }

  saveData() {
    const formData = this.vehicleForm.getRawValue();
    this.modalCtrl.dismiss({ ...formData })
  }
}
