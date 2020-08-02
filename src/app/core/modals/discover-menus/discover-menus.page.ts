import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-discover-menus',
  templateUrl: './discover-menus.page.html',
  styleUrls: ['./discover-menus.page.scss'],
})
export class DiscoverMenusPage implements OnInit {

  constructor(private popOvrCtrl: PopoverController) { }

  ngOnInit() {
  }

  onSelectMenus(data: string): void {
    this.popOvrCtrl.dismiss({
      typeMenus: data
    })
  }

}
