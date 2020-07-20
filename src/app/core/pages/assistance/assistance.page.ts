import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { getDataShopsList } from '../../util/dummy-data';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {
  lat = 7.0735836232495615;
  lng = 125.60605650000001;
  zoom = 15;
  items: any[] = [];
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
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  getCurrentPosition(): void { }
}
