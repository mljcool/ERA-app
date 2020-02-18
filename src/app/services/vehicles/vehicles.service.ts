import { VehicleModel } from 'src/app/models/vehicle.mode';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

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

  regVehicles(users: VehicleModel): Promise<any> {
    return this.vehicleRef.doc(users.id || '').set({ ...users });
  }

  getVehicleInfo(id: string): Promise<any> {
    return this.afs.firestore.doc(`customerVehicle/${id}`).get();
  }
}
