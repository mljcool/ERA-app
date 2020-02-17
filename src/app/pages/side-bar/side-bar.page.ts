import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { sideBarpages } from 'src/app/constants/sideBar';
import { AuthServiceService } from '../auth/auth-service.service';
import { MenusServiceService } from 'src/app/services/menus/menus-service.service';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { GoogleUser } from 'src/app/models/googleUser.model';
import { WipComponent } from 'src/app/modals/wip/wip.component';
import { UserService } from 'src/app/services/users/user-services';

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
    public modalController: ModalController,
    private userService: UserService,
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
      console.log(response);
      this.userData = response;
    });
  }

  onNavigatePages(pages: PagesLinks) {
    const { id } = this.pages.find(pg => pg.title === 'Logout');
    if (pages.id === id) {
      this.presentAlertConfirm();
      return;
    }
    console.log(this.userData.id);

    this.userService.checkVehicleRegistration(this.userData.id).then(response => {
      if (response) {
        this.router.navigate([pages.url]);
        return;
      }
      if (pages.url !== '/side-bar/accounts-vehicles') {

        this.isNotRegistered();
      }
    });
  }

  async isNotRegistered() {
    const alert = await this.alertController.create({
      header: 'Notice!',
      message: `You're not able to use other features make sure to register your vehicle info.`,
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
            this.router.navigate(['/side-bar/accounts-vehicles']);
          }
        }
      ]
    });

    await alert.present();
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


}
