import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { generateGUID } from 'src/app/utils/uidGenerator';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class MyCarsCoreService {
  private dbPath = '/newMyCars';

  userCarsRef: AngularFirestoreCollection<any> = null;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth, public toastController: ToastController) {
    this.userCarsRef = this.db.collection(this.dbPath);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please Login again session token null',
      duration: 3000
    });
    toast.present();
  }


  userChecker(): void {
    var user = firebase.auth().currentUser;
    console.log(user);

  }

  insertNewCars(data: any) {
    this.afAuth.auth.onAuthStateChanged((user) => {
      console.log('Save user', user)
      if (user) {
        data.uid = generateGUID();
        this.userCarsRef.add(data).then(() => {
          console.log('Save success')
        });
      } else {
        this.presentToast();
      }
    });

  }
}
