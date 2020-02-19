import { Component, OnInit, OnDestroy } from '@angular/core';
import { MyBookingService, IBooking } from './my-bookings.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.page.html',
  styleUrls: ['./my-bookings.page.scss'],
})
export class MyBookingsPage implements OnInit, OnDestroy {

  private unsubscribeAll: Subject<any>;
  public searchTerm = '';
  isLoading = true;
  myBookings: IBooking[] = [];
  copyMBookings: IBooking[] = [];

  constructor(private myBookSrvc: MyBookingService, private googleStorageUser: StoragUserDataService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.googleStorageUser.getObjectGoogleUsers().then(userData => {
      this.onFetchBookings(userData.id);
    });
  }
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  onFetchBookings(id: string): void {
    this.myBookSrvc
      .getAllBookings(id)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(response => {
        this.myBookings = response;
        this.copyMBookings = response;
        this.isLoading = false;
        console.log('this.myBookings', this.myBookings);
      });
  }

  reBookNow(data: any): void {

  }

  setFilteredItems(search: string): void {
    const searchTerm = search.toLowerCase();
    console.log(search);
    if (searchTerm !== '') {
      const copyMBookings = this.copyMBookings.filter(service => {
        return service.title.toLowerCase().includes(searchTerm);
      });
      this.myBookings = [...copyMBookings];
    } else {
      this.myBookings = this.copyMBookings;
    }
  }

}
