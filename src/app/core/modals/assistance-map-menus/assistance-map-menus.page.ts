import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-assistance-map-menus',
  templateUrl: './assistance-map-menus.page.html',
  styleUrls: ['./assistance-map-menus.page.scss'],
})
export class AssistanceMapMenusPage implements OnInit {

  constructor(public popover: PopoverController) { }

  ngOnInit() {
  }

  onProceed(type: string) {
    this.popover.dismiss({
      optionType: type
    });

  }

}
