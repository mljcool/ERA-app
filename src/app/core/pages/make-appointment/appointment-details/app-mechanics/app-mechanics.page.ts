import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-app-mechanics',
  templateUrl: './app-mechanics.page.html',
  styleUrls: ['./app-mechanics.page.scss'],
})
export class AppMechanicsPage implements OnInit {
  shopId: string = '';
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
        shopId: this.shopId,
      },
    };
    this.router.navigate(['/make-appointment'], navigationExtras);
  }
}
