import { Component, OnInit } from '@angular/core';
import {
    ModalController,
    ToastController,
    NavParams,
    LoadingController
} from '@ionic/angular';
import { AssistanceService } from '../assistance/assistance.service';
import { IAssistance } from 'src/app/models/assistance.model';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { generateGUID } from 'src/app/utils/uidGenerator';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
    notes: any;
    assistanceData: any;
    getApproximate: any;
    constructor(
        private modalCtrl: ModalController,
        public toastController: ToastController,
        private assistanceService: AssistanceService,
        private googleStorageUser: StoragUserDataService,
        private navParams: NavParams,
        public loadingController: LoadingController
    ) {
        this.assistanceData = this.navParams.get('assistanceData');
        this.getApproximate = this.navParams.get('getApproximate');
        console.log('this.assistanceData', this.assistanceData);
    }

    ngOnInit() {}

    async presentLoading() {
        const loading = await this.loadingController.create({
            message: 'Saving...'
        });
        await loading.present();
    }

    dismiss(idParams: string) {
        if (!this.notes) {
            this.presentToast();
            return;
        }

        this.modalCtrl.dismiss({
            dismissed: true,
            notes: this.notes,
            id: idParams,
        });
    }

    savingAssistance(): void {
        this.presentLoading();
        const assistanceType = this.assistanceData.assistanceType;
        const shopData = this.assistanceData.shopData;
        const userLocation = this.assistanceData.userLocation;
        this.googleStorageUser.getObjectGoogleUsers().then(data => {
            const postParams: IAssistance = {
                id: generateGUID(),
                myId: data.id,
                shopId: shopData.uid,
                assistanceType,
                status: 'PENDING',
                mylocation: {
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude
                },
                escalatedTime: '',
                flatRate: '',
                note: this.notes,
                googleStravelTimeEstimates: this.getApproximate.esitamteTravelTime,
                googleDistanceEstimates: this.getApproximate.distanceKM,
                googleWrittenAddress: this.getApproximate.writtenAddress,
            };
            this.assistanceService.saveRoadAssistance(postParams).then(() => {
                this.loadingController.dismiss();
                this.dismiss(postParams.id);
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
