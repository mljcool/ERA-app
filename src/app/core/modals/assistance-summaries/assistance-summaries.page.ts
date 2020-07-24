import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController } from '@ionic/angular';
import { assistTanceList } from 'src/app/constants/assistanceTypes';
import { Router } from '@angular/router';
import { AssistanceWaitingPage } from '../assistance-waiting/assistance-waiting.page';

@Component({
  selector: 'app-assistance-summaries',
  templateUrl: './assistance-summaries.page.html',
  styleUrls: ['./assistance-summaries.page.scss'],
})
export class AssistanceSummariesPage implements OnInit {
  isConfirming = false;
  serviceDetails = {};
  shopDetail = {};
  canUpdate = false;
  constructor(
    private navParams: NavParams,
    public alertController: AlertController,
    public modaCtrl: ModalController,
    private router: Router
  ) {

    const { shopDetail, serviceTypeParam, canUpdate } = this.navParams.get(
      'assistanceDetails'
    );

    this.serviceDetails = assistTanceList.find(
      (detail) => detail.id === parseInt(serviceTypeParam, 10)
    );
    this.shopDetail = shopDetail;
    this.canUpdate = canUpdate;
  }

  ngOnInit() { }

  onConfirm() {
    this.isConfirming = true;
    const confirming = setTimeout(() => {
      this.isConfirming = false;
      clearTimeout(confirming);
      this.presentAlert();
    }, 1000);
  }

  okayClose() {
    this.modaCtrl.dismiss();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Info',
      subHeader: 'Assistance',
      message: 'Your request successfully sent.',
      buttons: [{
        text: 'Okay',
        handler: () => {
          this.okayClose();
          this.router.navigate(['/main-menu']);
          this.viewWaiting({});
        }
      }],
    });

    await alert.present();
  }

  async viewWaiting(shopDetails) {
    const modal = await this.modaCtrl.create({
      component: AssistanceWaitingPage,
      cssClass: 'cart-modal',
    });
    await modal.present();
  }
}
