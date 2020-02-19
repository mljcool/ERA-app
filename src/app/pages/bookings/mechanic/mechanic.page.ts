
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MechanicServicesService, MechanicModels } from './mechanic.service';
import { ModalController } from '@ionic/angular';
import { BookingFormPage } from '../modal/booking-form/booking-form.page';

@Component({
  selector: 'app-mechanic',
  templateUrl: './mechanic.page.html',
  styleUrls: ['./mechanic.page.scss']
})
export class MechanicPage implements OnInit, OnDestroy {
  public searchTerm = '';
  isLoading = true;
  private unsubscribeAll: Subject<any>;
  mechanic: MechanicModels[] = [];
  copymechanic: MechanicModels[] = [];

  constructor(
    private mechanicServices: MechanicServicesService,
    private route: ActivatedRoute,
    private modalCtrl: ModalController,
  ) {
    this.unsubscribeAll = new Subject();
    this.route.queryParams
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(params => {
        console.log(params);
        this.onFetchMechanicData(params.id);
      });
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  async bookNow(data: MechanicModels) {
    const modal = await this.modalCtrl.create({
      component: BookingFormPage,
      cssClass: 'booking-modal'
    });
    modal.onWillDismiss().then(() => {

    });
    modal.present();
  }

  onFetchMechanicData(id: string): void {
    this.mechanicServices
      .getAllMechanic(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(response => {
        this.mechanic = response;
        this.copymechanic = response;
        this.isLoading = false;
        console.log('this.mechanic', this.mechanic);

      });
  }

  setFilteredItems(search: string): void {
    const searchTerm = search.toLowerCase();
    console.log(search);
    if (searchTerm !== '') {
      const copymechanic = this.copymechanic.filter(service => {
        return service.name.toLowerCase().includes(searchTerm);
      });
      this.mechanic = [...copymechanic];
    } else {
      console.log('here');
      this.mechanic = this.copymechanic;
    }
  }
}
