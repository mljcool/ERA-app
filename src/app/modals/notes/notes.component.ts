import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, NavParams } from '@ionic/angular';
import { AssistanceService } from '../assistance/assistance.service';
import { IAssistance } from 'src/app/models/assistance.model';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
    notes: any;
    assistanceData: any;
    constructor(
        private modalCtrl: ModalController,
        public toastController: ToastController,
        private assistanceService: AssistanceService,
        private googleStorageUser: StoragUserDataService,
        private navParams: NavParams,
    ) {
      this.assistanceData = this.navParams.get('assistanceData');
      console.log('this.assistanceData', this.assistanceData);
    }

    ngOnInit() {}

    dismiss() {
        if (!this.notes) {
            this.presentToast();
            return;
        }

        this.modalCtrl.dismiss({
            dismissed: true,
            notes: this.notes
        });
    }

    savingAssistance(): void {
      const assistanceType = this.assistanceData.assistanceType;
      const shopData = this.assistanceData.shopData;
      const userLocation = this.assistanceData.userLocation;
      this.googleStorageUser.getObjectGoogleUsers().then(data => {
        const postParams: IAssistance = {
          myId: data.id,
          shopId: shopData.uid,
          assistanceType,
          status: 'PENDING',
          mylocation: {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
          },
          escalatedTime: '',
          note: this.notes

        };
        this.assistanceService.saveRoadAssistance(postParams).then(() => {
            this.dismiss();
        });
      });

    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Notes is requried',
            duration: 600
        });
        toast.present();
    }
}
