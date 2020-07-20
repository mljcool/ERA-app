import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getDataShopsList } from '../../util/dummy-data';
import { mapStyle, myMarker } from '../../util/map-styles';
import { myMapTheme } from '../../map-theme/themeList';
import { GmapOptionsPage } from '../../modals/gmap-options/gmap-options.page';
import { ModalController } from '@ionic/angular';
import { darkTheme } from '../../map-theme/dark';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {
  lat = 7.05198;
  lng = 125.571784;
  zoom = 15;
  markerDesigned = myMarker;
  mapThemeStyle = darkTheme;

  items: any[] = [];
  private unsubscribeAll: Subject<any>;
  serviceTypeParam: string = '';

  constructor(
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { serviceType } = params;
        this.serviceTypeParam = serviceType;
      });
    this.items = getDataShopsList();
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getCurrentPosition(): void { }

  viewMenu(): void {
    console.log('here');
  }

  async onViewMapThemes() {
    const modal = await this.modalCtrl.create({
      component: GmapOptionsPage,
      cssClass: 'cart-modal',
    });
    modal.onWillDismiss().then(({ data }) => {
      const { themeType } = data;
      if (!themeType) {
        this.mapThemeStyle = [];
        return;
      }
      this.mapThemeStyle = myMapTheme[themeType];

      console.log('mapThemeStyle', themeType);
    });
    modal.present();
  }
}
