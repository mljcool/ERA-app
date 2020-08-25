import { Component, OnInit } from '@angular/core';
import { ToastController, NavParams } from '@ionic/angular';
import { saveRatings } from '../../configs/firebaseRef/RatingsCore';

@Component({
  selector: 'app-working-progress',
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.scss'],
})
export class StarRatingModalPage implements OnInit {
  shopDetails: any = {};
  comments: any = '';
  rate = 0;

  constructor(
    public toastController: ToastController,
    private navParams: NavParams
  ) {
    this.shopDetails = this.navParams.get('carDetails');
  }

  ngOnInit() {}

  onRateChange($event) {
    console.log('event', $event);
  }

  submitRatings() {
    saveRatings().then(() => {
      this.presentToast();
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Thanks for your feedback.',
      duration: 2000,
    });
    toast.present();
  }
}
