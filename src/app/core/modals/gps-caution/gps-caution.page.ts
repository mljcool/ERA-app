import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gps-caution',
  templateUrl: './gps-caution.page.html',
  styleUrls: ['./gps-caution.page.scss'],
})
export class GpsCautionPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onClose(): void {
    this.modalCtrl.dismiss();
  }

}
