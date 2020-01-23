import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { sideBarpages } from 'src/app/constants/sideBar';
import { AuthServiceService } from '../auth/auth-service.service';
import { MenusServiceService } from 'src/app/services/menus/menus-service.service';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { GoogleUser } from 'src/app/models/googleUser.model';
import { WipComponent } from 'src/app/modals/wip/wip.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.page.html',
  styleUrls: ['./side-bar.page.scss']
})
export class SideBarPage implements OnInit {
  pages: Array<PagesLinks>;
  selectedPath = '';
  userData: GoogleUser;

  constructor(
    private router: Router,
    public alertController: AlertController,
    private authService: AuthServiceService,
    public menuServices: MenusServiceService,
    private googleStorageUser: StoragUserDataService,
    public modalController: ModalController
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
    this.menuServices.getSideBardMenus().then(response => {
      this.pages = response;
    });
    this.googleStorageUser.getObjectGoogleUsers().then(response => {
      this.userData = response;
    });
  }

  onNavigatePages(pages: PagesLinks) {
    const { id } = this.pages.find(pg => pg.title === 'Logout');
    if (pages.id === id) {
      this.presentAlertConfirm();
      return;
    }

    this.router.navigate([pages.url]);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('None');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.authService.logout().then(response => {
              if (!response) {
                this.googleStorageUser.clearUserStorage().then(() => {
                  this.router.navigateByUrl('');
                });
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: WipComponent
    });
    return await modal.present();
  }
}
