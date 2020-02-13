import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentChangeAction,
  Action,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists
} from '@angular/fire/firestore';

import { Observable, from } from 'rxjs';
import {
  map,
  tap,
  take,
  switchMap,
  mergeMap,
  expand,
  takeWhile
} from 'rxjs/operators';
import * as firebase from 'firebase/app';
import { IUsers } from 'src/app/models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { Plugins } from '@capacitor/core';
import { GoogleUser } from 'src/app/models/googleUser.model';
import { StoragUserDataService } from '../storages/storage-user-services';

const { GoogleAuth } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: GoogleUser;
  private dbPath = '/customerUser';

  userRef: AngularFirestoreCollection<IUsers> = null;

  constructor(private afs: AngularFirestore,
              private googleStorageUser: StoragUserDataService,
              private afAuth: AngularFireAuth) {
    this.userRef = afs.collection(this.dbPath);
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  createCustomer(users: GoogleUser): Promise<any> {
    return this.userRef.doc(users.id || '').set({ ...users });
  }

  getAuthoShopList(): AngularFirestoreCollection<IUsers> {
    return this.userRef;
  }

  userDataParser(user: object): IUsers | any {
    return { ...JSON.parse(JSON.stringify(user)) };
  }


  checkRegUser(uid: string): Promise<any> {
    return this.afs.firestore.doc(`/customerUser/${uid}`).get();
  }

  checkVehicleRegistration(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afs.firestore.doc(`/customerVehicle/${id}`).get().then(response => {
        resolve(response.exists);
      });
    });
  }

  checkifStillLogin(): Promise<IUsers> {
    return new Promise((resolve, reject) => {
      this.googleStorageUser.getObjectGoogleUsers().then(response => {
        this.userData = response;
        this.checkRegUser(this.userData.id || '').then(hasRecord => {
            if (!hasRecord.exists) {
              this.createCustomer(this.userData).then(created => {
                  console.log('created', created);
              });
            }
        });
      });
    });
  }

}
