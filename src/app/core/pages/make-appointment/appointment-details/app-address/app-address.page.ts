import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-address',
  templateUrl: './app-address.page.html',
  styleUrls: ['./app-address.page.scss'],
})
export class AppAddressPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack(): void {
    this.router.navigateByUrl('/make-appointment');
  }
}
