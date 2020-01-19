import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { sideBarpages } from 'src/app/constants/sideBar';
import { AuthServiceService } from '../auth/auth-service.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.page.html',
  styleUrls: ['./side-bar.page.scss']
})
export class SideBarPage implements OnInit {
  pages: PagesLinks[] = sideBarpages;
  selectedPath = '';

  constructor(
    private router: Router,
    public alertController: AlertController,
    private authService: AuthServiceService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {}

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
                this.router.navigateByUrl('');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
}
