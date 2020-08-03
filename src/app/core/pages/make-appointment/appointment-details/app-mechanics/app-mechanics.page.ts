import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-mechanics',
  templateUrl: './app-mechanics.page.html',
  styleUrls: ['./app-mechanics.page.scss'],
})
export class AppMechanicsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack(): void {
    this.router.navigateByUrl('/make-appointment');
  }
}
