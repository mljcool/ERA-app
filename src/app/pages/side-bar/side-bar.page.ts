import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.page.html',
  styleUrls: ['./side-bar.page.scss']
})
export class SideBarPage implements OnInit {
  pages: PagesLinks[] = [
    {
      id: 1,
      title: 'Account',
      icon: 'person',
      url: '/side-bar/main-menus'
    },
    {
      id: 2,
      title: 'My Vehicle',
      icon: 'car',
      url: '/side-bar/locations'
    },
    {
      id: 3,
      title: 'Bookings',
      icon: 'calendar',
      url: '/side-bar/locations'
    },
    {
      id: 4,
      title: 'Discover Shops',
      icon: 'star',
      url: '/side-bar/locations'
    },
    {
      id: 5,
      title: 'Settings',
      icon: 'settings',
      url: '/side-bar/locations'
    },
    {
      id: 6,
      title: 'Logout',
      icon: 'exit',
      url: '/side-bar/locations'
    }
  ];

  selectedPath = '';

  constructor(private router: Router, public alertController: AlertController) {
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
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Okay',
          handler: () => {
            this.router.navigateByUrl('');
            this.alertController.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }
}

interface PagesLinks {
  id: number;
  title: string;
  url: string;
  icon: string;
}
