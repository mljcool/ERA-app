import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController } from '@ionic/angular';
import { assistTanceList } from 'src/app/constants/assistanceTypes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assistance-summaries',
  templateUrl: './assistance-summaries.page.html',
  styleUrls: ['./assistance-summaries.page.scss'],
})
export class AssistanceSummariesPage implements OnInit {
  isConfirming = false;
  afterConfirmed = false;
  serviceDetails = {};
  shopDetail = {};
  constructor(
    private navParams: NavParams,
    public alertController: AlertController,
    public modaCtrl: ModalController,
    private router: Router
  ) {
    const { shopDetail, serviceTypeParam } = this.navParams.get(
      'assistanceDetails'
    );
    this.serviceDetails = assistTanceList.find(
      (detail) => detail.id === parseInt(serviceTypeParam, 10)
    );
    this.shopDetail = shopDetail;
  }

  ngOnInit() { }

  onConfirm() {
    this.isConfirming = true;
    const confirming = setTimeout(() => {
      this.isConfirming = false;
      clearTimeout(confirming);
      this.afterConfirmed = true;
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
          this.router.navigate(['/main-menu'])
        }
      }],
    });

    await alert.present();
  }
}
