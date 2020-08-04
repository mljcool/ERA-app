import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/common-ui/PopoverMenu/pop-over-menu.component';
import { Router, NavigationExtras } from '@angular/router';
import { AssistanceModalPage } from '../../modals/assistance-modal/assistance-modal.page';
import { getDataShopsList } from '../../util/dummy-data';
import { AssistanceCoreServices } from '../../global/Services/AssistanceCore.service';
import { WorkingProgressPage } from '../../modals/working-progress/working-progress.page';
import { Subject } from 'rxjs';
import { AuthServiceService } from 'src/app/pages/auth/auth-service.service';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit, OnDestroy {
  items: any[] = [];
  assistanceStatus: boolean = false;
  private _unsubscribeAll: Subject<any>;

  constructor(
    public popoverController: PopoverController,
    private router: Router,
    private modalCtrl: ModalController,
    private assistanceSrvc: AssistanceCoreServices,
    private authService: AuthServiceService,
    private googleStorageUser: StoragUserDataService,
  ) {
    this._unsubscribeAll = new Subject();
    this.items = getDataShopsList();

  }

  ionViewWillEnter() {
    this.assistanceSrvc.getAssistanceStatus().then(({ isTracking }) => {
      this.assistanceStatus = isTracking;
    });
  }
  ngOnInit() { }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
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
        const { viewAccount, onLogOut } = data;
        if (viewAccount) {
          this.router.navigateByUrl('/my-account');
        }
        if (onLogOut) {
          this.authService.logout().then(response => {
            if (!response) {
              this.googleStorageUser.clearUserStorage().then(() => {
                this.router.navigateByUrl('');
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
        isFromMainMenu: 1
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

  viewShopDetails(data): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: 1,
      },
    };
    this.router.navigate(['/shop-details'], navigationExtras);
  }
}
