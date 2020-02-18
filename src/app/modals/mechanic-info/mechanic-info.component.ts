import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mechanic-info',
  templateUrl: './mechanic-info.component.html',
  styleUrls: ['./mechanic-info.component.scss'],
})
export class MechanicInfoComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  closeModal() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
