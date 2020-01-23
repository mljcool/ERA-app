import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { servicesMenus } from './../../constants/servicesMenus';
import { Component, OnInit } from '@angular/core';
import { MenusServiceService } from 'src/app/services/menus/menus-service.service';
import { WipComponent } from 'src/app/modals/wip/wip.component';

@Component({
  selector: 'app-main-menus',
  templateUrl: './main-menus.page.html',
  styleUrls: ['./main-menus.page.scss']
})
export class MainMenusPage implements OnInit {
  listOfServices: Array<ServiceMenus>;

  constructor(
    public menuServices: MenusServiceService,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
    this.menuServices.getServicesMenus().then(response => {
      this.listOfServices = response;
      console.log(response);
    });
  }
  onProceed(pageTogo: ServiceMenus): void {
    if (!pageTogo.link) {
      this.presentModal();
      return;
    }

    this.router.navigate([pageTogo.link]);
  }


  async presentModal() {
    const modal = await this.modalController.create({
      component: WipComponent
    });
    return await modal.present();
  }
}
