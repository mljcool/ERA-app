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

import { IAutoShop } from 'src/app/models/autoShop.model';
import { IUsers } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private dbPath = '/users';

  userRef: AngularFirestoreCollection<IUsers> = null;

  constructor(private afs: AngularFirestore) {
    this.userRef = afs.collection(this.dbPath);
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  createCustomer(users: IUsers): void {
    this.userRef.add({ ...users });
  }

  getAuthoShopList(): AngularFirestoreCollection<IUsers> {
    return this.userRef;
  }
}
