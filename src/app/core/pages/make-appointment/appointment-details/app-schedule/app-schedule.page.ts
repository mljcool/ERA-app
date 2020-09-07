import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
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
  shopId = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { shopId } = params;
        this.shopId = shopId;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  ngOnInit(): void {}

  submitBooking(data: any): void {}

  onBack(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: this.shopId,
      },
    };

    if (!this.isViewOnly) {
      this.router.navigate(['/make-appointment'], navigationExtras);
      return;
    }
    this.router.navigateByUrl('/transactions');
  }
}
