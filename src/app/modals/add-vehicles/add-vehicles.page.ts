import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.page.html',
  styleUrls: ['./add-vehicles.page.scss'],
})
export class AddVehiclesPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismissModal(): void {
    this.modalCtrl.dismiss({
      dismiss: true
    });
  }

}
