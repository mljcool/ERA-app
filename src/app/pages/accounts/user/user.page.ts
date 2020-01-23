import { Component, OnInit } from '@angular/core';
import { GoogleUser } from 'src/app/models/googleUser.model';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  userData: GoogleUser;
  constructor(private googleStorageUser: StoragUserDataService) {

    this.googleStorageUser.getObjectGoogleUsers().then(response => {
      this.userData = response;
    });
  }

  ngOnInit() {
  }

}
