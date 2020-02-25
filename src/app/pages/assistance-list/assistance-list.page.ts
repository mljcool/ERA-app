import { takeUntil } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAssistance } from 'src/app/models/assistance.model';
import { AssistanceService } from 'src/app/modals/assistance/assistance.service';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-assistance-list',
  templateUrl: './assistance-list.page.html',
  styleUrls: ['./assistance-list.page.scss']
})
export class AssistanceListPage implements OnInit, OnDestroy {
  public searchTerm = '';
  assistanceLists: IAssistance[];
  shops: IAssistance[] = [];
  copyShops: IAssistance[] = [];
  isLoading = true;

  private unsubscribeAll: Subject<any>;

  constructor(
    private assistanceService: AssistanceService,
    private googleStorageUser: StoragUserDataService,
    private router: Router
  ) {

    this.unsubscribeAll = new Subject();

  }

  ngOnInit() { }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  ionViewWillEnter() {
    this.googleStorageUser.getObjectGoogleUsers().then(data => {
      this.assistanceService
        .getAllAssistance(data.id).pipe(takeUntil(this.unsubscribeAll))
        .subscribe(assistanceLists => {
          this.assistanceLists = assistanceLists;
          this.shops = this.copyShops = assistanceLists;
          this.isLoading = false;
          console.log(assistanceLists);
        });
    });
  }

  setFilteredItems(search: string): void {
    const searchTerm = search.toLowerCase();
    console.log(search);
    if (searchTerm !== '') {
      const copyShops = this.shops.filter(service => {
        return service.assistanceType.label
          .toLowerCase()
          .includes(searchTerm);
      });
      this.assistanceLists = [...copyShops];
    } else {
      console.log('here');
      this.assistanceLists = this.copyShops;
    }
  }

  gotPreview(param: IAssistance): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: param.id,
        navigationId: 2,
      }
    };
    this.router.navigate(
      ['/side-bar/assistance-preview'],
      navigationExtras
    );
  }
}
