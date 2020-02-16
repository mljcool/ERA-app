import { VehicleModel } from 'src/app/models/vehicle.mode';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { IAssistance } from 'src/app/models/assistance.model';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  onRoadSideAssistanceData: BehaviorSubject<any>;


  private dbPath = '/roadSideAssistance';
  vehicleRef: AngularFirestoreCollection<IAssistance> = null;

  constructor(private afs: AngularFirestore,
  ) {

    this.onRoadSideAssistanceData = new BehaviorSubject({});
    this.vehicleRef = afs.collection(this.dbPath);
  }

  saveRoadAssistance(data: IAssistance): Promise<any> {
    return this.vehicleRef.add({ ...data });
  }
}
