import { MechanicModels } from './../../models/Mechanic.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-mechanic-info',
  templateUrl: './mechanic-info.component.html',
  styleUrls: ['./mechanic-info.component.scss']
})
export class MechanicInfoComponent implements OnInit {
  mechanicInfo: MechanicModels;
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
  ) {
    this.mechanicInfo = this.navParams.get('mechanicInfo');
  }

  ngOnInit() { }

  dismissModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
