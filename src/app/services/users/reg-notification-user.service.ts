

import { Injectable } from '@angular/core';
import { GoogleUser } from 'src/app/models/googleUser.model';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { IUsersNotifConfig } from 'src/app/models/notification.model';
import { StoragUserDataService } from '../storages/storage-user-services';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {
  userData: GoogleUser;
  private dbPath = '/customerNotifConfig';
  userRef: AngularFirestoreCollection<IUsersNotifConfig> = null;

  constructor(private afs: AngularFirestore,
              ) {
                this.userRef = afs.collection(this.dbPath);
  }

  createCustomerToken(users: IUsersNotifConfig): Promise<any> {

    return this.userRef.doc(users.userId || '').set({ ...users });
  }

}
