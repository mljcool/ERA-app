import { Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.page.html',
  styleUrls: ['./side-bar.page.scss'],
})
export class SideBarPage implements OnInit {
  pages: PagesLinks[] = [
    {
      title: 'First Page',
      url: '/side-bar/main-menus'
    },
    {
      title: 'Second Page',
      url: '/side-bar/locations'
    }
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      console.log(event);
      this.selectedPath = event.url;
    })
  }

  ngOnInit() {
  }

}


interface PagesLinks {
  title: string;
  url: string;
}