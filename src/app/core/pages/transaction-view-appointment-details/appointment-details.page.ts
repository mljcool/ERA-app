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
  bookingUID = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { bookingUID } = params;
        this.bookingUID = bookingUID;
        console.log('AppointmentDetailsPage', this.bookingUID);
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
        bookingUID: this.bookingUID,
      },
    };
    this.router.navigate(
      ['/transaction-view-appointment-details/' + urls],
      navigationExtras
    );
  }
}
