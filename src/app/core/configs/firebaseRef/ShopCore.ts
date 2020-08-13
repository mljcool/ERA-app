import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { firebase } from '../firebase/firebase.config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopCoreService {
  onAllShops: BehaviorSubject<Array<any>>;
  userId: any = '';
  private dbPath = '/newMyCars';

  userCarsRef: AngularFirestoreCollection<any> = null;

  constructor(
    private db: AngularFirestore,
    public toastController: ToastController,
    public googleStorageUser: StoragUserDataService,
    public alertController: AlertController
  ) {
    this.userCarsRef = this.db.collection(this.dbPath);
    this.onAllShops = new BehaviorSubject([]);
    this.getAllShops();
  }

  getAllShops = () => {
    const shop = firebase.firestore().collection('newShopList').where('status', '==', 'ACCEPTED');
    shop.onSnapshot((snapshot) => {
      const allShop = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }));
      this.onAllShops.next(allShop);
    });
  };

  getOneShops = (uid) => {
    return firebase.firestore().collection('newShopList').where('uid', '==', uid);
  };
}
