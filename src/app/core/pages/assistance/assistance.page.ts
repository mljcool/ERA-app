import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.page.html',
  styleUrls: ['./assistance.page.scss'],
})
export class AssistancePage implements OnInit {

  private unsubscribeAll: Subject<any>;
  serviceTypeParam: string = '';

  constructor(private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();

    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(params => {
        const { serviceType } = params;
        this.serviceTypeParam = serviceType;
      });

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
