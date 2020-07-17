import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/common-ui/PopoverMenu/pop-over-menu.component';

const lorem = 'Lorem ipsum dolor sit amet,rum.';

const images = [
  'bandit',
  'batmobile',
  'blues-brothers',
  'bueller',
  'delorean',
  'eleanor',
  'general-lee',
  'ghostbusters',
  'knight-rider',
  'mirth-mobile'
];

function getImgSrc() {
  const src = 'https://dummyimage.com/600x400/${Math.round( Math.random() * 99999)}/fff.png';
  rotateImg++;
  if (rotateImg === images.length) {
    rotateImg = 0;
  }
  return src;
}

let rotateImg = 0;

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {


  items: any[] = [];
  constructor(public popoverController: PopoverController) {
    for (let i = 0; i < 10; i++) {
      this.items.push({
        name: images[rotateImg],
        imgSrc: getImgSrc(),
        avatarSrc: getImgSrc(),
        content: lorem.substring(0, Math.random() * (lorem.length - 100) + 100)
      });

      rotateImg++;
      if (rotateImg === images.length) {
        rotateImg = 0;
      }
    }
  }

  ngOnInit() {
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }



}
