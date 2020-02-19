import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mechanic',
  templateUrl: './mechanic.page.html',
  styleUrls: ['./mechanic.page.scss'],
})
export class MechanicPage implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  constructor(private route: ActivatedRoute) {

    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(params => {
        console.log(params);
      });

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
