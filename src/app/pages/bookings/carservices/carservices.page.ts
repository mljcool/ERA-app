import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarServicesService, IServicesModel } from './carservices.service';
import { categories } from '../../shopping-cart/constants/categories';
import { ModalController } from '@ionic/angular';
import { BookingFormPage } from '../modal/booking-form/booking-form.page';

@Component({
  selector: 'app-carservices',
  templateUrl: './carservices.page.html',
  styleUrls: ['./carservices.page.scss']
})
export class CarservicesPage implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any>;
  public searchTerm = '';
  isLoading = true;
  carservices: IServicesModel[] = [];
  copycarservices: IServicesModel[] = [];

  constructor(
    private myCarServices: CarServicesService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(params => {
        this.onFetchMechanicData(params.id);
      });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  async bookNow(data: IServicesModel) {
    const modal = await this.modalCtrl.create({
      component: BookingFormPage,
      cssClass: 'booking-modal',
      componentProps: {
        servicesData: data
      }
    });
    modal.onWillDismiss().then(() => { });
    modal.present();
  }

  onFetchMechanicData(id: string): void {
    this.myCarServices
      .getAllService(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(response => {
        this.carservices = response.map(item => {
          item.categoryByname = categories.find(
            cat => cat.value === item.category
          ).name;
          return item;
        });
        this.carservices = response;
        this.copycarservices = response;
        this.isLoading = false;
        console.log('this.carservices', this.carservices);
      });
  }

  setFilteredItems(search: string): void {
    const searchTerm = search.toLowerCase();
    console.log(search);
    if (searchTerm !== '') {
      const copycarservices = this.copycarservices.filter(service => {
        return service.name.toLowerCase().includes(searchTerm);
      });
      this.carservices = [...copycarservices];
    } else {
      this.carservices = this.copycarservices;
    }
  }
}
