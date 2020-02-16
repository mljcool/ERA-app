import { VehicleModel } from 'src/app/models/vehicle.mode';
import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAssistance } from 'src/app/models/assistance.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AssistanceService {
    onRoadSideAssistanceData: BehaviorSubject<any>;

    private dbPath = '/roadSideAssistance';
    vehicleRef: AngularFirestoreCollection<IAssistance> = null;

    constructor(private afs: AngularFirestore) {
        this.onRoadSideAssistanceData = new BehaviorSubject({});
        this.vehicleRef = afs.collection(this.dbPath);
    }

    saveRoadAssistance(data: IAssistance): Promise<any> {
        return this.vehicleRef.add({ ...data });
    }

    getAllMyPendingAssistance(id: string): Observable<IAssistance[]> {
        return this.afs
            .collection<IAssistance>('roadSideAssistance', ref => {
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
