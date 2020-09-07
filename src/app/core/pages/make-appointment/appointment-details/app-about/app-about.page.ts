import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-app-about',
  templateUrl: './app-about.page.html',
  styleUrls: ['./app-about.page.scss'],
})
export class AppAboutPage implements OnInit {
  shopId = '';
  private unsubscribeAll: Subject<any>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((params) => {
        const { shopId } = params;
        this.shopId = shopId;
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
