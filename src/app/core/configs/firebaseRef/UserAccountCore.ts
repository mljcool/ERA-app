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
export class UserAccountCoreService {
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
    });
  }

  getAccountDetails = (userId) => {
    const cars = firebase
      .firestore()
      .collection('newCustomers')
      .where('id', '==', userId);
  };

}