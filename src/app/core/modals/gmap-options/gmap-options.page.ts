import { Component, OnInit } from '@angular/core';
import { myMapTheme } from '../../map-theme/themeList';
import { capitalize } from '../../util/string';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gmap-options',
  templateUrl: './gmap-options.page.html',
  styleUrls: ['./gmap-options.page.scss'],
})
export class GmapOptionsPage implements OnInit {
  myMapTheme: Array<any> = [{
    name: 'Standard',
    type: null,
    thumSrc: './assets/images/map-styles/standard.png'
  }];
  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    Object.keys(myMapTheme).forEach((theme) => {
      const themeName = capitalize(theme).replace('Theme', '');
      const thumSrc = `./assets/images/map-styles/${theme.replace('Theme', '')}.png`;
      this.myMapTheme.push({
        name: themeName,
        type: theme,
        thumSrc
      });
    });
    console.log(this.myMapTheme);
  }

  onProceed({ type }) {
    this.modalCtrl.dismiss({
      themeType: type
    })
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
