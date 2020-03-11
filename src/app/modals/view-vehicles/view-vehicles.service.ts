import { VehicleModel } from 'src/app/models/vehicle.mode';
import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAssistance } from 'src/app/models/assistance.model';
import { map } from 'rxjs/operators';
import { MechanicModels } from 'src/app/models/Mechanic.model';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class ViewVehicleService {
    onRoadSideAssistanceData: BehaviorSubject<any>;

    private dbPath = '/customerVehicle';
    assistanceRef: AngularFirestoreCollection<IAssistance> = null;

    constructor(private afs: AngularFirestore) {
        this.onRoadSideAssistanceData = new BehaviorSubject({});
        this.assistanceRef = afs.collection(this.dbPath);
    }

    saveRoadAssistance(data: IAssistance): Promise<any> {
        data.dateAdded = this.timestamp;

        return this.assistanceRef.add({ ...data });
    }
    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }


    getVehicleInfo(id: string): Promise<any> {
      return this.afs.firestore.doc(`customerVehicle/${id}`).get();
    }
    
    getAllMyPendingAssistance(id: string): Observable<IAssistance[]> {
        return this.afs
            .collection<IAssistance>('customerVehicle', ref => {
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
