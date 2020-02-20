import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-set-contact-info',
  templateUrl: './set-contact-info.page.html',
  styleUrls: ['./set-contact-info.page.scss'],
})
export class SetContactInfoPage implements OnInit {

  contact: any = {};

  constructor(private modalCtrl: ModalController, public toastController: ToastController) { }

  ngOnInit() {
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Notes or contact are requried',
      duration: 600
    });
    toast.present();
  }

  dismiss(idParams: string) {
    const { contactOne, contactTwo, notes } = this.contact;
    if (!contactOne || !contactTwo || !notes) {
      this.presentToast();
      return;
    }
    this.modalCtrl.dismiss({
      dismissed: true,
      info: {
        contactOne,
        contactTwo,
        notes
      }
    });
  }
}
