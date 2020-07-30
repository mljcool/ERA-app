import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VehicleModel } from 'src/app/models/vehicle.mode';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.page.html',
  styleUrls: ['./add-cars.page.scss'],
})
export class AddCarsPage implements OnInit {
  vehicleForm: FormGroup;
  vehicle: VehicleModel;
  isLoading = false;

  constructor(private formBuilder: FormBuilder) {
    this.vehicleForm = this.formBuilder.group({
      plateNumber: ['', Validators.required],
      modelName: ['', Validators.required],
      modelYear: ['', Validators.required],
      description: ['', Validators.required],
      color: ['', Validators.required],
      fuelType: ['', Validators.required],
    });
  }

  ngOnInit() { }

  saveData() {
    console.log(this.vehicleForm.getRawValue());
  }
}
