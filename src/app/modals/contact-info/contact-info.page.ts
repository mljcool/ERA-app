import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.page.html',
  styleUrls: ['./contact-info.page.scss'],
})
export class ContactInfoPage implements OnInit {
  contact: any = {};

  constructor(private modalCtrl: ModalController, private toastController: ToastController) { }

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
    const { contactOne, contactTwo } = this.contact;
    if (!contactOne || !contactTwo) {
      this.presentToast();
      return;
    }
    this.modalCtrl.dismiss({
      dismissed: true,
      info: {
        contactOne,
        contactTwo,
      }
    });
  }

}
