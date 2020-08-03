import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-about',
  templateUrl: './app-about.page.html',
  styleUrls: ['./app-about.page.scss'],
})
export class AppAboutPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack(): void {
    this.router.navigateByUrl('/make-appointment');
  }
}
