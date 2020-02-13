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

@Injectable({
  providedIn: 'root'
})
export class AutoShopServicesService {
  private dbPath = '/autoShop';

  shopsRef: AngularFirestoreCollection<IAutoShop> = null;

  constructor(private afs: AngularFirestore) {
    this.shopsRef = afs.collection(this.dbPath);
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getAuthoShopList(): AngularFirestoreCollection<IAutoShop> {
    return this.shopsRef;
  }
}
