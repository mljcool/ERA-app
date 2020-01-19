import { Injectable } from '@angular/core';
import { servicesMenus } from 'src/app/constants/servicesMenus';
import { sideBarpages } from 'src/app/constants/sideBar';

@Injectable({
  providedIn: 'root'
})
export class MenusServiceService {
  constructor() {}

  public getServicesMenus(): Promise<ServiceMenus[]> {
    return new Promise((resolve, reject) => {
      resolve(servicesMenus);
    });
  }

  getSideBardMenus(): Promise<Array<PagesLinks>> {
    return new Promise<PagesLinks[]>((resolve, reject) => {
      resolve(sideBarpages);
    });
  }
}
