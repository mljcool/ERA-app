import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-assistance-map-menus',
  templateUrl: './assistance-map-menus.page.html',
  styleUrls: ['./assistance-map-menus.page.scss'],
})
export class AssistanceMapMenusPage implements OnInit {

  isNearestOnly = false;
  constructor(public popover: PopoverController, private navParams: NavParams,) {

    this.isNearestOnly = this.navParams.get('isOnlyNearest');
    console.log(this.isNearestOnly);
  }

  ngOnInit() {
  }

  onProceed(type: string) {
    this.popover.dismiss({
      optionType: type
    });

  }

}
