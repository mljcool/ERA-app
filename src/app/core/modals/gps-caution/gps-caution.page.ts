import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-gps-caution',
  templateUrl: './gps-caution.page.html',
  styleUrls: ['./gps-caution.page.scss'],
})
export class GpsCautionPage implements OnInit {
  isFromMenus: boolean = false;
  constructor(public modalCtrl: ModalController, private navParams: NavParams) {
    this.isFromMenus = this.navParams.get('isFromMenu');
  }

  ngOnInit() { }

  onClose(): void {
    this.modalCtrl.dismiss();
  }
}
