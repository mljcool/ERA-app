import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wip',
  templateUrl: './wip.component.html',
  styleUrls: ['./wip.component.scss'],
})
export class WipComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  ngOnInit() {}

}
