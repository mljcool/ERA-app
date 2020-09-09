import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getService } from 'src/app/core/configs/firebaseRef/ShopServicesCore';

@Component({
  selector: 'app-app-about',
  templateUrl: './app-about.page.html',
  styleUrls: ['./app-about.page.scss'],
})
export class AppAboutPage implements OnInit {
  shopId = '';
  serviceId = '';
  total = 0;
  serviceDetail: any = {};
  private unsubscribeAll: Subject<any>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { shopId, serviceId } = params;
        this.shopId = shopId;
        this.serviceId = serviceId;
        this.getServiceDetails(serviceId);
      });
  }

  getServiceDetails(serviceId): void {
    getService(serviceId).onSnapshot((snapshot) => {
      const serviceDetail = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }));

      if (serviceDetail.length) {
        this.serviceDetail = serviceDetail[0];
        this.total = this.serviceDetail.products.reduce(
          (i, j) => i + j.price * j.quantity,
          0
        );

        console.log('app-about', this.serviceDetail);
        console.log('app-total', this.total);
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onBack(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopuid: this.shopId,
      },
    };

    this.router.navigate(['/make-appointment'], navigationExtras);
  }
}
