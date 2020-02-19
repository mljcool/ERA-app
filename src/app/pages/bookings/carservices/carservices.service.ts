
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';


export interface IServicesModel {
  id: string;
  key: string;
  name: string;
  category: number;
  price: number;
  mechanic: string;
  active: boolean;
  description: string;
  uid: string;
  categoryByname?: string;
  estimatedTime: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CarServicesService {
  private dbPath = '/services';
  private onCarservicesChanged = new BehaviorSubject(0);
  private services = [];

  servicesRef: AngularFirestoreCollection<IServicesModel> = null;

  constructor(private afs: AngularFirestore) {
    this.servicesRef = afs.collection(this.dbPath);
  }


  getAllService(id: string): Observable<IServicesModel[]> {
    return this.afs
      .collection<IServicesModel>('services', ref => {
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
