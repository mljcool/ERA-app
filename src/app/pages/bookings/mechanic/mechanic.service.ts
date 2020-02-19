
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface MechanicModels {
  id: string;
  uid: string;
  key: string;
  name: string;
  lastName: string;
  nickname: string;
  email: string;
  phone: string;
  address: string;
  birthday: string;
  notes: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MechanicServicesService {
  private dbPath = '/mechanic';
  private onmechanicservicesChanged = new BehaviorSubject(0);
  private mechanic = [];

  mechanicRef: AngularFirestoreCollection<MechanicModels> = null;

  constructor(private afs: AngularFirestore) {
    this.mechanicRef = afs.collection(this.dbPath);
  }

  getAllMechanic(id: string): Observable<MechanicModels[]> {
    return this.afs
      .collection<MechanicModels>('mechanic', ref => {
        const query: firebase.firestore.Query = ref;

        return query.where(
          'uid',
          '==',
          id
        );
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
