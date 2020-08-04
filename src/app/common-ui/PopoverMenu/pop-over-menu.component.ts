import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './pop-over-menu.component.html',
  styleUrls: ['./pop-over-menu.component.scss'],
})
export class PopoverComponent implements OnInit {
  constructor(public popover: PopoverController) { }

  ngOnInit() { }

  dismissPopover() {
    this.popover.dismiss();
  }

  viewMyAcount(): void {
    this.popover.dismiss({
      viewAccount: true,
    });
  }

  onLogOut(): void {
    this.popover.dismiss({
      isLogOut: true,
    });
  }
}
