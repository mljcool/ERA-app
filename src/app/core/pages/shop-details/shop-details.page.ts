import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.page.html',
  styleUrls: ['./shop-details.page.scss'],
})
export class ShopDetailsPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }

  onBack(): void {
    this.router.navigateByUrl('/main-menu');
  }

  onOrderItems(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: 1,
      },
    };
    this.router.navigate(['/make-orders'], navigationExtras);
  }

  onAppoinment(): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        shopId: 1,
      },
    };
    this.router.navigate(['/make-appointment'], navigationExtras);
  }
}
