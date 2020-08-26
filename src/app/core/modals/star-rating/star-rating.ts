import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams, ModalController } from '@ionic/angular';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { saveRatings } from '../../configs/firebaseRef/RatingsCore';

@Component({
  selector: 'app-working-progress',
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.scss'],
})
export class StarRatingModalPage implements OnInit {
  details: any = {};
  comments: any = '';
  rate = 0;

  constructor(
    private googleStorageUser: StoragUserDataService,
    public toastController: ToastController,
    private navParams: NavParams,
    public modalCtrl: ModalController
  ) {
    this.googleStorageUser.getObjectGoogleUsers().then((data) => {
      const details = this.navParams.get('details');
      this.details = {
        ...details,
        userData: data,
      };
    });
  }

  ngOnInit() {}

  onRateChange($event) {
    this.rate = $event;
    console.log('event', $event);
  }

  submitRatings() {
    if (!this.rate && !this.comments) {
      this.presentToast('We required to add comment and star ratings');
      return;
    }
    const payLoad = {
      ...this.details,
      ratings: this.rate,
      comments: this.comments,
    };
    saveRatings(payLoad).then(() => {
      this.presentToast('Thanks for your feedback.');
      this.modalCtrl.dismiss({
        data: {
          ratings: this.rate,
          comments: this.comments,
        },
      });
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
