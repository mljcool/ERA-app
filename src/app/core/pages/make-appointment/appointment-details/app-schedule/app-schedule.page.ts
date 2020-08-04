import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-schedule',
  templateUrl: './app-schedule.page.html',
  styleUrls: ['./app-schedule.page.scss'],
})
export class AppSchedulePage implements OnInit {

  minDate: string = new Date().toISOString();
  isSubmitting = false;
  bookingData: any = {};
  servicesData: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  submitBooking(data: any): void {

  }

  onBack(): void {
    this.router.navigateByUrl('/make-appointment');
  }
}
