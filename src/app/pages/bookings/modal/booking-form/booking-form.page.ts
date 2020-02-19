import { ModalController, LoadingController, NavParams, AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { BookingFormService } from './bookingFrom.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.page.html',
  styleUrls: ['./booking-form.page.scss']
})
export class BookingFormPage implements OnInit {
  minDate: string = new Date().toISOString();
  isSubmitting = false;
  bookingData: any = {};
  servicesData: any;

  constructor(
    private modalCtr: ModalController,
    private googleStorageUser: StoragUserDataService,
    private bokingFormService: BookingFormService,
    public loadingController: LoadingController,
    private navParams: NavParams,
    private alertCtrl: AlertController
  ) {

    this.servicesData = this.navParams.get('servicesData');
    console.log(this.servicesData);
  }

  ngOnInit() { }

  dismissModal() {
    this.modalCtr.dismiss({
      dismiss: true
    });
  }

  submitBooking(data: any): void {
    const params = {
      ...data,
      ...this.servicesData
    };
    this.isSubmitting = true;
    this.presentLoading();
    this.googleStorageUser.getObjectGoogleUsers().then(userData => {
      if (userData) {
        params.customerId = userData;
        this.bokingFormService.saveBooking(params).then(response => {
          this.isSuccessSaving();
        });
      }
    });
  }

  async presentLoading() {
    this.isSubmitting = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    await loading.present();
  }

  isSuccessSaving(): void {
    this.loadingController.dismiss();
    this.alertCtrl.create({
      header: 'Thanks for your bookin!',
      message: 'we will respond to you as soon as possible',
      buttons: ['OK']
    }).then(alert => {
      alert.present().then(() => {
        this.dismissModal();
        this.loadingController.dismiss();
        this.isSubmitting = false;
      });

    });
  }
}
