import { IAutoShop } from 'src/app/models/autoShop.model';
import { IAssistance } from './../../models/assistance.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.scss'],
})
export class AssistanceComponent implements OnInit {

  assistanceParams: any = {};
  assistanceData: IAssistance;
  shopData: IAutoShop;
  userLocation: any;

  constructor(private modalCtrl: ModalController, navParams: NavParams, private modalController: ModalController) {

    this.shopData = navParams.get('shopData');
    this.userLocation = navParams.get('userLocation');
    console.log(navParams.get('shopData'));
  }

  ngOnInit() { }

  onProceed(type: string): void {
    const params: any = {
      assistanceType: type,

    };
    this.modalController.create({
      component: NotesComponent,
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(({ data }) => {
        params.notes = data.notes;
      });
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

}
