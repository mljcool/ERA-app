import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController } from '@ionic/angular';
import { assistTanceList } from 'src/app/constants/assistanceTypes';
import { Router, NavigationExtras } from '@angular/router';
import { AssistanceWaitingPage } from '../assistance-waiting/assistance-waiting.page';
import { AssistanceCoreServices } from '../../global/Services/AssistanceCore.service';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { AppAssistanceCoreService } from '../../configs/firebaseRef/AssistanceCore';
import { getTotalRatingByShop } from '../../configs/firebaseRef/RatingsCore';

@Component({
  selector: 'app-assistance-summaries',
  templateUrl: './assistance-summaries.page.html',
  styleUrls: ['./assistance-summaries.page.scss'],
})
export class AssistanceSummariesPage implements OnInit {
  isConfirming = false;
  getApproximate: any = {};
  serviceDetails: any = {};
  userLocation: any = {};
  assistanceNotes: any;
  shopDetail: any = {};
  userData: any = {};
  canUpdate = false;
  constructor(
    private navParams: NavParams,
    public alertController: AlertController,
    public modaCtrl: ModalController,
    private router: Router,
    private googleStorageUser: StoragUserDataService,
    private assistanceSrvc: AppAssistanceCoreService
  ) {
    const {
      shopDetail,
      serviceTypeParam,
      canUpdate,
      getApproximate,
      userLocation,
    } = this.navParams.get('assistanceDetails');

    this.serviceDetails = assistTanceList.find(
      (detail) => detail.id === parseInt(serviceTypeParam, 10)
    );
    this.shopDetail = shopDetail;
    getTotalRatingByShop(shopDetail.uid).then((rate: any) => {
      this.shopDetail.ratings = isNaN(rate) ? '0' : parseInt(rate);
    });
    this.userLocation = userLocation;
    this.getApproximate = getApproximate;
    this.canUpdate = canUpdate;
    this.googleStorageUser.getObjectGoogleUsers().then((data) => {
      this.userData = data;
      console.log('userData', this.userData);
      console.log('serviceDetails', this.serviceDetails);
      console.log('shopDetail', this.shopDetail);
      console.log('getApproximate', this.getApproximate);
      console.log('userLocation', this.userLocation);
    });
  }

  ngOnInit() {}

  onConfirm() {
    this.isConfirming = true;
    const constructData = {
      shopId: this.shopDetail.uid,
      assistanceTypeId: this.serviceDetails.id,
      notes: this.assistanceNotes || '',
      userLocation: {
        latitude: this.userLocation.latitude,
        longitude: this.userLocation.longitude,
      },
      ...this.getApproximate,
    };
    this.assistanceSrvc
      .saveAssistance(constructData)
      .then(({ Data, isSuccess }) => {
        if (isSuccess) {
          const confirming = setTimeout(() => {
            this.isConfirming = false;
            clearTimeout(confirming);
            this.presentAlert(Data);
          }, 1000);
        }
      });
  }

  okayClose() {
    this.modaCtrl.dismiss();
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Info',
      subHeader: 'Assistance',
      message: 'Your request successfully sent.',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.okayClose();
            this.onViewAssistanceDetails(data);
          },
        },
      ],
    });

    await alert.present();
  }

  onViewAssistanceDetails(transDetails): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: transDetails.assistanceUId,
        isFromMainMenu: 0,
      },
    };
    this.router.navigate([`/transaction-details-assistance`], navigationExtras);
  }

  async viewWaiting(shopDetails) {
    const modal = await this.modaCtrl.create({
      component: AssistanceWaitingPage,
      cssClass: 'cart-modal',
    });
    await modal.present();
  }
}
