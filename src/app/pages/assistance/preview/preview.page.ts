import { Component, OnInit, OnDestroy } from '@angular/core';
import { AssistanceService } from 'src/app/modals/assistance/assistance.service';
import { Subject } from 'rxjs';
import { takeUntil, retry, filter } from 'rxjs/operators';
import { IAssistance } from 'src/app/models/assistance.model';
import {
    ActionSheetController,
    AlertController,
    ModalController,
    ToastController
} from '@ionic/angular';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { MechanicModels } from 'src/app/models/Mechanic.model';
import { MechanicInfoComponent } from 'src/app/modals/mechanic-info/mechanic-info.component';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.page.html',
    styleUrls: ['./preview.page.scss']
})
export class PreviewPage implements OnInit, OnDestroy {
    private unsubscribeAll: Subject<any>;
    navigationId = '0';
    paramAccessor: any;
    shopInformation: any = {};
    mechanicInfo: MechanicModels | any = {};
    assistanceData: IAssistance = {
        status: 'PENDING',
        id: '',
        mylocation: {
            longitude: null,
            latitude: null
        },
        escalatedTime: '',
        shopId: '',
        myId: '',
        note: '',
        flatRate: '',
        assistanceType: {
            id: 0,
            imgSrc: '',
            label: ''
        },
        googleDistanceEstimates: '',
        googleStravelTimeEstimates: '',
        googleWrittenAddress: '',
        confirmationStatus: false,
        myContactNumber: [],
        assignedMechanic: ''
    };
    mapSetup = {
        message: `I'm Here`,
        iconUrl: {
            url: `assets/images/commons/blue-moving-car.gif`,
            scaledSize: { height: 80, width: 110 }
        }
    };

    constructor(
        private assistanceService: AssistanceService,
        public actionSheetController: ActionSheetController,
        private route: ActivatedRoute,
        public alertController: AlertController,
        private modalController: ModalController,
        public toastController: ToastController,
        public router: Router,
    ) {
        this.unsubscribeAll = new Subject();
        this.assistanceService.onRoadSideAssistanceData
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(response => {
                this.paramAccessor = response;
            });

        this.route.queryParams
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(params => {
                this.navigationId = params.navigationId;
                if (params && params.id) {
                    this.assistanceService
                        .getAllMyPendingAssistance(params.id)
                        .subscribe(responseAssistance => {
                            this.assistanceData = responseAssistance[0];
                            this.assistanceService
                                .getShopInformations(this.assistanceData.shopId)
                                .then(data => {
                                    this.shopInformation = data.data();
                                    console.log(
                                        'shopInformation',
                                        this.shopInformation
                                    );
                                });
                            this.getMyMechanicData(
                                this.assistanceData.assignedMechanic
                            );
                            console.log(this.assistanceData);
                        });
                }
            });
    }

    ngOnInit(): void {
    }

    clickedMarker(m: any): void { }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll.next();
        this.unsubscribeAll.complete();
    }

    getMyMechanicData(id): void {
        this.assistanceService
            .getMyMechanicData(id)
            .pipe(takeUntil(this.unsubscribeAll))
            .subscribe(mechanicData => {
                this.mechanicInfo = [];
                this.mechanicInfo = mechanicData[0];
                if (mechanicData.length && !this.assistanceData.confirmationStatus) {
                    setTimeout(() => {
                        this.showMechanicInformation();
                    }, 1500);
                }
                console.log('mechanicInfo', this.mechanicInfo);
            });
    }

    showMechanicInformation() {
        this.modalController
            .create({
                component: MechanicInfoComponent,
                componentProps: {
                    mechanicInfo: this.mechanicInfo
                }
            })
            .then(modal => {
                modal.present();
                modal.onDidDismiss().then(({ data }) => { });
            });
    }

    getMenus(): void {
        if (this.assistanceData.confirmationStatus) {
            this.presentActionSheetExit();
            return;
        }
        this.presentActionSheet();
    }

    async presentActionSheetExit() {
        const actionSheet = await this.actionSheetController.create({
            header: `Your road assistance already done.`,
            buttons: [
                {
                    text: 'Close this request',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        this.router.navigate(['/side-bar/main-menus']);
                    }
                },
                {
                    text: 'View all request',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        this.router.navigate(['/side-bar/assistance-list']);
                    }
                }
            ]
        });
        await actionSheet.present();
    }

    async presentActionSheet() {
        const buttons = [];
        buttons.push(
            {
                text: 'All good and Done',
                role: 'destructive',
                icon: 'happy',
                handler: () => {
                    if (this.assistanceData.status !== 'ACCEPTED') {
                        this.presentToast();
                        return;
                    }
                    this.assistanceService
                        .allGoodAndDone(this.assistanceData.key)
                        .then(() => {
                            this.presentAlert();
                        });
                }
            },
            {
                text: 'Show Mechanic info',
                icon: 'person',
                handler: () => {
                    if (!this.mechanicInfo) {
                        this.presentToast();
                        return;
                    }
                    this.showMechanicInformation();
                }
            },

        );

        if (this.navigationId === '2') {
            buttons.push({
                text: 'Back to list',
                icon: 'arrow-back',
                handler: () => {
                    this.router.navigate(['/side-bar/assistance-list']);
                }
            });
        } else {
            buttons.push({
                text: 'Close',
                icon: 'close',
                role: 'cancel',
                handler: () => {

                }
            });

        }


        const actionSheet = await this.actionSheetController.create({
            header: `Hey, how was my service?`,
            buttons,
        });
        await actionSheet.present();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Yeheey!',
            subHeader: 'Done',
            message: 'Thank you for choosing our shop and using our services.',
            buttons: ['OK']
        });
        await alert.present();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Wait for the shop to respond first.',
            duration: 1000
        });
        toast.present();
    }
}
