import { Component, OnInit } from '@angular/core';
import { NavParams, Platform } from '@ionic/angular';
import { InterVehicleModel } from 'src/app/services/vehicles/vehicles.service';
import { ViewVehicleService } from './view-vehicles.service';

@Component({
  selector: 'app-view-vehicles',
  templateUrl: './view-vehicles.page.html',
  styleUrls: ['./view-vehicles.page.scss'],
})
export class ViewVehiclesPage implements OnInit {

  vehicleData: InterVehicleModel;

  constructor(private viewVehicleSrvc: ViewVehicleService, private navParams: NavParams){ 
    this.vehicleData = this.navParams.get('vehicleData');
    console.log();
    this.viewVehicleSrvc.getVehicleInfo(this.vehicleData.key).then(response => {

    });
  }

  ngOnInit() {

  }

}
