import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { generateGUID } from 'src/app/utils/uidGenerator';
import { ToastController } from '@ionic/angular';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { firebase } from '../firebase/firebase.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppAssistanceCoreService {
  onAssistance: BehaviorSubject<Array<any>>;
  userId: any = '';
  assintanceRef: AngularFirestoreCollection<any> = null;
  private dbPath = '/newAssistance';

  constructor(
    private db: AngularFirestore,
    public toastController: ToastController,
    private googleStorageUser: StoragUserDataService,
  ) {
    this.assintanceRef = this.db.collection(this.dbPath);
    this.onAssistance = new BehaviorSubject([]);
    this.googleStorageUser.getObjectGoogleUsers().then((user) => {
      this.userId = user.id;
      this.getAllAssistance();
    });
  }

  saveAssistance(data: any = {}): Promise<any> {
    const hasData = Object.keys(data).length;
    return new Promise((resolve, reject) => {
      if (hasData) {
        data.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());
        data.userId = this.userId;
        data.assistanceUId = generateGUID();
        data.status = 'PENDING';
        data.type = 'ASSITANCE';
        console.log('ASSISTANCE DATA', data);
        this.assintanceRef.add(data).then(() => {
          resolve(true);
        });
      } else {
        resolve(false);
      }
    });
  }

  getAllAssistance = () => {
    const assistance = firebase
      .firestore()
      .collection('newAssistance')
      .where('userId', '==', this.userId);
    assistance.onSnapshot((snapshot) => {
      const myAssistance = snapshot.docs.map((car) => ({
        key: car.id,
        ...car.data(),
      }));
      this.onAssistance.next(myAssistance);
    });
  };

  getOneAssistance = (assistanceUId) => {
    return firebase.firestore().collection('newAssistance').where('assistanceUId', '==', assistanceUId);
  };

}
