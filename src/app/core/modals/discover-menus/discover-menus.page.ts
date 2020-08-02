import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-discover-menus',
  templateUrl: './discover-menus.page.html',
  styleUrls: ['./discover-menus.page.scss'],
})
export class DiscoverMenusPage implements OnInit {

  services: Array<any> = [
    {
      id: 1,
      label: 'Appointment',
      type: 'appointment',
      imgSrc: this.srcPath('calendar.gif'),
      lines: '',
    },
    {
      id: 2,
      label: 'Shop a parts',
      type: 'orders',
      imgSrc: this.srcPath('cart.gif'),
      lines: 'none',
    }
  ];
  constructor(private popOvrCtrl: PopoverController) { }

  ngOnInit() {
  }


  srcPath(imgName): string {

    return `./assets/images/commons/${imgName}`;
  }

  onSelectMenus(data: string): void {
    this.popOvrCtrl.dismiss({
      typeMenus: data
    })
  }

}
