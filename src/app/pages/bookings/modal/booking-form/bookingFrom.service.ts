import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
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
    customerId: string;
    status: string;
    referenceId: string;
    startTime: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BookingFormService {
  private dbPath = '/booking';
  private mechanic = [];

  bookingRef: AngularFirestoreCollection<IBooking> = null;

  constructor(private afs: AngularFirestore) {
    this.bookingRef = afs.collection(this.dbPath);
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  saveBooking(formData: any): Promise<any> {
    const params = {
      start: new Date(formData.startDate),
      end: new Date(formData.startDate),
      title: formData.categoryByname,
      allDay: false,
      color: {
        primary: null,
        secondary: null,
      },
      resizable: {
        beforeStart: false,
        afterEnd: false,
      },
      draggable: false,
      meta: {
        location: null,
        notes: formData.notes,
      },
      extraData: {
        customerId: formData.customerId,
        status: 'PENDING',
        referenceId: generateGUID(),
        startTime: formData.time,
      },
      disposableData: formData
    };
    return this.bookingRef.add({ ...params });
  }



}
