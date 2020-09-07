import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.page.html',
  styleUrls: ['./appointment-details.page.scss'],
})
export class AppointmentDetailsPage implements OnInit {
  private unsubscribeAll: Subject<any>;
  isViewOnly = false;
  bookingId = 0;
  shopId = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { isViewOnly, bookingId, shopId } = params;
        console.log(isViewOnly);
        this.bookingId = bookingId;
        this.shopId = shopId;
        this.isViewOnly = !!parseInt(isViewOnly, 10);
      });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onNavigate(urls) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        bookingId: this.bookingId,
        isViewOnly: 1,
        shopId: this.shopId,
      },
    };

    if (!this.isViewOnly) {
      this.router.navigate(['/appoinment-details/' + urls], navigationExtras);
      return;
    }

    this.router.navigate(['/appoinment-details/' + urls], navigationExtras);
  }
}
