import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getMyBookingDetails } from 'src/app/core/configs/firebaseRef/BookingCore';
import { getService } from 'src/app/core/configs/firebaseRef/ShopServicesCore';

@Component({
  selector: 'app-app-mechanics',
  templateUrl: './app-mechanics.page.html',
  styleUrls: ['./app-mechanics.page.scss'],
})
export class AppMechanicsPage implements OnInit {
  shopId: string = '';
  serviceId: string = '';
  bookingUID: any = '';
  bookingDetails: any = {};

  personnels: any = [
    {
      name: '',
      lastName: '',
    },
  ];
  private unsubscribeAll: Subject<any>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { bookingUID } = params;
        this.bookingUID = bookingUID;
        this.getMyBookingDetails(bookingUID);
      });
  }

  getMyBookingDetails(bookingUID): void {
    getMyBookingDetails(bookingUID).onSnapshot((snapshot) => {
      this.bookingDetails = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }))[0];
      const { shopUID, serviceId } = this.bookingDetails;
      this.serviceId = serviceId;
      this.getServiceDetails(serviceId);
    });
  }

  getServiceDetails(serviceId): void {
    getService(serviceId).onSnapshot((snapshot) => {
      const serviceDetail: any = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }))[0];
      const { personnels } = serviceDetail;
      this.personnels = [...personnels, ...this.personnels];
      console.log('app-mechanics', this.personnels);
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onBack(): void {
    this.router.navigate(['/transaction-details-booking']);
  }
}
