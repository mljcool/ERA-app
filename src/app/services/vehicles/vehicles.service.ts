import { VehicleModel } from 'src/app/models/vehicle.mode';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

export interface InterVehicleModel {
  key?: string;
  id: string;
  plateNumber: string;
  model: string;
  modelYear: string;
  color: string;
  fuelType: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  private dbPath = '/customerVehicle';
  vehicleRef: AngularFirestoreCollection<VehicleModel> = null;

  constructor(private afs: AngularFirestore,
  ) {

    this.vehicleRef = afs.collection(this.dbPath);
  }

  updateVehicle(vehicle: InterVehicleModel): Promise<any> {
    return this.vehicleRef.doc(vehicle.key || '').set({ ...vehicle });
  }

  regVehicles(users: VehicleModel): Promise<any> {
    return this.vehicleRef.add(Object.assign({}, users));
  }

  getVehicleInfo(id: string): Promise<any> {
    return this.afs.firestore.doc(`customerVehicle/${id}`).get();
  }

  getAllVehicles(id: string): Observable<InterVehicleModel[]> {
    return this.afs
      .collection<InterVehicleModel>('customerVehicle', ref => {
        const query: firebase.firestore.Query = ref;

        return query.where('id', '==', id);
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
