import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assistance-waiting',
  templateUrl: './assistance-waiting.page.html',
  styleUrls: ['./assistance-waiting.page.scss'],
})
export class AssistanceWaitingPage implements OnInit {

  constructor(public modaCtrl: ModalController) { }

  ngOnInit() {
  }

  onClose() {
    this.modaCtrl.dismiss();
  }

}
