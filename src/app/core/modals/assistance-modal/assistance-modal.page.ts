import { Component, OnInit } from '@angular/core';
import { assistTanceList } from 'src/app/constants/assistanceTypes';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-assistance-modal',
  templateUrl: './assistance-modal.page.html',
  styleUrls: ['./assistance-modal.page.scss'],
})
export class AssistanceModalPage implements OnInit {

  services: AssistanceTypes[] = assistTanceList;
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  onProceed(serviceType: AssistanceTypes) {
    this.modalCtrl.dismiss({
      serviceType: serviceType.id
    })
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
