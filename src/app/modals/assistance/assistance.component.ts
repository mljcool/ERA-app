import { AssistanceService } from './assistance.service';
import { Router, NavigationExtras } from '@angular/router';
import { IAutoShop } from 'src/app/models/autoShop.model';
import { IAssistance } from './../../models/assistance.model';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
import { NotesComponent } from '../notes/notes.component';
import { assistTanceList } from 'src/app/constants/assistanceTypes';

@Component({
    selector: 'app-assistance',
    templateUrl: './assistance.component.html',
    styleUrls: ['./assistance.component.scss']
})
export class AssistanceComponent implements OnInit {
    assistanceParams: any = {};
    assistanceData: IAssistance;
    shopData: IAutoShop;
    userLocation: any;
    getApproximate: any;
    timeOut: any;
    services: AssistanceTypes[] = assistTanceList;

    constructor(
        private modalCtrl: ModalController,
        private navParams: NavParams,
        private modalController: ModalController,
        private router: Router,
        private assistanceService: AssistanceService
    ) {
        this.shopData = this.navParams.get('shopData');
        this.userLocation = this.navParams.get('userLocation');
        this.getApproximate = this.navParams.get('getApproximate');
        console.log(navParams.get('shopData'));
    }

    ngOnInit() {}

    onProceed(type: any): void {
        const params: any = {
            assistanceType: type,
            shopData: this.shopData,
            userLocation: this.userLocation
        };
        this.modalController
            .create({
                component: NotesComponent,
                componentProps: {
                    assistanceData: params,
                    getApproximate: this.getApproximate
                }
            })
            .then(modal => {
                modal.present();
                modal.onDidDismiss().then(({ data }) => {
                    params.notes = data.notes;
                    if (params.notes) {
                        this.assistanceService.onRoadSideAssistanceData.next({
                            id: data.id,
                            params
                        });
                        this.timeOut = setTimeout(() => {
                            this.dismiss(data.id);
                        }, 100);
                    }
                });
            });
    }

    dismiss(params: any) {
        this.modalCtrl
            .dismiss({
                dismissed: true
            })
            .then(() => {
                console.log('HERE');
                clearTimeout(this.timeOut);
                const navigationExtras: NavigationExtras = {
                  queryParams: {
                    id: params
                  }
                };

                this.router.navigate(['/side-bar/assistance-preview'], navigationExtras);
            });
    }
    closeModal() {
        this.modalCtrl.dismiss({
            dismissed: true
        });
    }
}
