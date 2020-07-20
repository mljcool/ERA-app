import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/common-ui/PopoverMenu/pop-over-menu.component';
import { Router, NavigationExtras } from '@angular/router';
import { AssistanceModalPage } from '../../modals/assistance-modal/assistance-modal.page';
import { getDataShopsList } from '../../util/dummy-data';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {
  items: any[] = [];
  constructor(
    public popoverController: PopoverController,
    private router: Router,
    private modalCtrl: ModalController
  ) {
    this.items = getDataShopsList();
  }

  ngOnInit() { }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  navigator(url) {
    console.log(url);
    //assistance
  }

  async onViewAssistanceModal() {
    const modal = await this.modalCtrl.create({
      component: AssistanceModalPage,
      cssClass: 'cart-modal',
    });
    modal.onWillDismiss().then(({ data }) => {
      console.log(data);
      const { serviceType } = data;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          serviceType: serviceType,
        }
      };

      this.router.navigate(['/assistance'], navigationExtras);

    });
    modal.present();
  }
}
