import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getDataShopsList } from '../../util/dummy-data';
import { mapStyle, mapStyleTwo, myMarker } from '../../util/map-styles';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {

  lat = 7.051980;
  lng = 125.571784;
  zoom = 15;
  markerDesigned = myMarker;

  items: any[] = [];
  styles: any[] = mapStyleTwo;
  private unsubscribeAll: Subject<any>;
  serviceTypeParam: string = '';

  constructor(private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { serviceType } = params;
        this.serviceTypeParam = serviceType;
      });
    this.items = getDataShopsList();
    console.log(this.items);
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
}
