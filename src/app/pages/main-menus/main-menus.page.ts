import { Router } from '@angular/router';
import { servicesMenus } from './../../constants/servicesMenus';
import { Component, OnInit } from '@angular/core';
import { MenusServiceService } from 'src/app/services/menus/menus-service.service';

@Component({
  selector: 'app-main-menus',
  templateUrl: './main-menus.page.html',
  styleUrls: ['./main-menus.page.scss']
})
export class MainMenusPage implements OnInit {
  listOfServices: Array<ServiceMenus>;

  constructor(
    public menuServices: MenusServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuServices.getServicesMenus().then(response => {
      this.listOfServices = response;
      console.log(response);
    });
  }
  onProceed(pageTogo: ServiceMenus): void {
    console.log(!!pageTogo.link);
    if (!pageTogo.link) {
      return;
    }

    this.router.navigate([pageTogo.link]);
  }
}
