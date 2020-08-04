import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-app-schedule',
  templateUrl: './app-schedule.page.html',
  styleUrls: ['./app-schedule.page.scss'],
})
export class AppSchedulePage implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  minDate: string = new Date().toISOString();
  isSubmitting = false;
  bookingData: any = {};
  servicesData: any;
  isViewOnly = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { isViewOnly } = params;
        this.isViewOnly = !!parseInt(isViewOnly, 10);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngOnInit(): void { }

  submitBooking(data: any): void { }

  onBack(): void {
    if (!this.isViewOnly) {
      this.router.navigateByUrl('/make-appointment');
      return;
    }
    this.router.navigateByUrl('/transactions');
  }
}
