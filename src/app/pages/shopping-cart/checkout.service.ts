
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
}
@Injectable({
  providedIn: 'root'
})
export class CheckoutCartService {
  data: Orders[] = [];
  private dbPath = '/orders';

  shopsRef: AngularFirestoreCollection<Orders> = null;

  constructor(private afs: AngularFirestore) {
    this.shopsRef = afs.collection(this.dbPath);
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  checkoutOrders(itemData: any, total, uid, name): Promise<any> {

    const shopId = itemData[0].uid;
    const params: Orders = {
      reference: generateGUID(),
      total,
      date: this.timestamp,
      products: itemData,
      status: 'PENDING',
      shopId,
      customer: {
        uid,
        name
      }

    };

    return this.shopsRef.add({ ...params });
  }



}
