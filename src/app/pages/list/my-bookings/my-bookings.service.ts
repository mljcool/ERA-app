import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  AngularFirestoreCollection,
  AngularFirestore
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { generateGUID } from 'src/app/utils/uidGenerator';

export interface IBooking {
  start: string | any;
  end: string | any;
  title: string;
  allDay: boolean;
  color: {
    primary: string;
    secondary: string;
  };
  resizable: {
    beforeStart: boolean;
    afterEnd: boolean;
  };
  draggable: boolean;
  meta: {
    location: string;
    notes: string;
  };
  extraData: {
    customerData: string;
    status: string;
    referenceId: string;
    startTime: string;
  };
  disposableData: any;
}

@Injectable({
  providedIn: 'root'
})
export class MyBookingService {
  private dbPath = '/booking';
  private mechanic = [];

  bookingRef: AngularFirestoreCollection<IBooking> = null;

  constructor(private afs: AngularFirestore) {
    this.bookingRef = afs.collection(this.dbPath);
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  getAllBookings(id: string): Observable<IBooking[]> {
    return this.afs
      .collection<IBooking>('booking', ref => {
        const query: firebase.firestore.Query = ref;

        return query.where('extraData.customerData.id', '==', id);
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
