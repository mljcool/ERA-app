
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { generateGUID } from 'src/app/utils/uidGenerator';
import * as firebase from 'firebase';


export interface Prod {
  id: string;
  name: string;
  price: string;
  quantity: number;
  total: string;
};

export interface Orders {
  reference?: string;
  shopId?: string;
  total: string;
  date?: any;
  status: string;
  customer?: {
    uid: string,
    name: string,
    shippingAddress?: {
      address: string;
      lat: number;
      lng: number;
    }
  };
  products: Array<Prod[]>;
  colorWeb: string;
  colorMobile: string;
}
@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {
  data: Orders[] = [];
  private dbPath = '/orders';

  shopsRef: AngularFirestoreCollection<Orders> = null;

  constructor(private afs: AngularFirestore) {
    this.shopsRef = afs.collection(this.dbPath);
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getAllOrders(id: string): Observable<Orders[]> {
    return this.afs
      .collection<Orders>('orders', ref => {
        const query: firebase.firestore.Query = ref;

        return query.where('customer.uid', '==', id);
      })
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({
            key: c.payload.doc.id,
            ...c.payload.doc.data()
          }))
        )
      );
  }
}

