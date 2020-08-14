import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/common-ui/PopoverMenu/pop-over-menu.component';
import { Router, NavigationExtras } from '@angular/router';
import { AssistanceModalPage } from '../../modals/assistance-modal/assistance-modal.page';
import { getDataShopsList } from '../../util/dummy-data';
import { WorkingProgressPage } from '../../modals/working-progress/working-progress.page';
import { Subject, zip } from 'rxjs';
import { AuthServiceService } from 'src/app/pages/auth/auth-service.service';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { MyCarsCoreService } from '../../configs/firebaseRef/MyCarsCore';
import { takeUntil, map } from 'rxjs/operators';
import { ShopCoreService } from '../../configs/firebaseRef/ShopCore';
import { AppAssistanceCoreService } from '../../configs/firebaseRef/AssistanceCore';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit, OnDestroy {
  shops: any[] = [];
  assistanceList: any[] = [];
  countCars = 0;
  countTransaction = 0;
  assistanceStatus: boolean = false;
  userData: any = {};

  private _unsubscribeAll: Subject<any>;

  constructor(
    public popoverController: PopoverController,
    private router: Router,
    private modalCtrl: ModalController,
    private assistanceSrvc: AppAssistanceCoreService,
    private authService: AuthServiceService,
    private googleStorageUser: StoragUserDataService,
    private myCarSrvc: MyCarsCoreService,
    private shopSrvc: ShopCoreService,
  ) {
    this._unsubscribeAll = new Subject();
    this.getAllObservalbles();
  }

  ionViewWillEnter() {
    this.googleStorageUser.getObjectGoogleUsers().then((data) => {
      this.userData = data;
      console.log(this.userData);
    });
  }

  getAllObservalbles() {
    const onMyCars$ = this.myCarSrvc.onMyCars;
    const onAllShops$ = this.shopSrvc.onAllShops;
    const onAssistance$ = this.assistanceSrvc.onAssistance;

    zip(onAllShops$, onMyCars$, onAssistance$)
      .pipe(takeUntil(this._unsubscribeAll),
        map(([onAllShops$, onMyCars$, onAssistance$]) => ({ onAllShops$, onMyCars$, onAssistance$ })),
      ).subscribe(observers => {
        const { onAllShops$, onMyCars$, onAssistance$ } = observers;
        this.shops = onAllShops$;
        this.countCars = onMyCars$.length;
        this.assistanceList = onAssistance$.filter(data => data.status === 'PENDING');
        this.countTransaction = onAssistance$.length;
      });
  }

  ngOnInit() {
    console.log('ALWAYS HERE.....................');
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    popover.onWillDismiss().then(({ data }) => {
      if (data) {
        const { viewAccount, isLogOut } = data;
        if (viewAccount) {
          this.router.navigateByUrl('/my-account');
        }
        if (isLogOut) {
          this.authService.logout().then((response) => {
            console.log('here Logout', response);
            if (!response) {
              this.googleStorageUser.clearUserStorage().then(() => {
                this.router.navigateByUrl('/auth');
              });
            }
          });
        }
      }
    });
    await popover.present();
  }

  navigator(url) {
    console.log(url);
    this.router.navigate(['/' + url]);
    //assistance
  }

  async onViewAssistanceModal() {
    const modal = await this.modalCtrl.create({
      component: AssistanceModalPage,
      cssClass: 'cart-modal',
    });
    modal.onWillDismiss().then(({ data }) => {
      if (data) {
        const { serviceType } = data;
        const navigationExtras: NavigationExtras = {
          queryParams: {
            serviceType: serviceType,
          },
        };
        this.router.navigate(['/assistance'], navigationExtras);
      }
    });
    modal.present();
  }

  onViewDetails(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: 1,
        isFromMainMenu: 1,
      },
    };
    this.router.navigate(['/transaction-details-assistance'], navigationExtras);
  }

  async onWIP() {
    const modal = await this.modalCtrl.create({
      component: WorkingProgressPage,
      cssClass: 'wip-modal',
    });
    await modal.present();
  }

  viewShopDetails({ uid }): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: uid,
      },
    };
    this.router.navigate(['/shop-details'], navigationExtras);
  }
}
