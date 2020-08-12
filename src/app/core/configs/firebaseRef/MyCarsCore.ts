import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { generateGUID } from 'src/app/utils/uidGenerator';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController, AlertController } from '@ionic/angular';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { firebase } from '../firebase/firebase.config';
import { async } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyCarsCoreService {
  onMyCars: BehaviorSubject<Array<any>>;
  userId: any = '';
  private dbPath = '/newMyCars';

  userCarsRef: AngularFirestoreCollection<any> = null;

  constructor(
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    public toastController: ToastController,
    private googleStorageUser: StoragUserDataService,
    public alertController: AlertController
  ) {
    this.userCarsRef = this.db.collection(this.dbPath);
    this.onMyCars = new BehaviorSubject([]);
    this.googleStorageUser.getObjectGoogleUsers().then((user) => {
      this.userId = user.id;
      this.getmyCars();

    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Saved',
      message: 'Car successfully added',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async useRightAway(data) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Make this car ' + data.modelName + ' in use?',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            data.insUsed = false;
            this.saveMyCar(data);
          },
        },
        {
          text: 'Okay',
          handler: () => {
            data.insUsed = true;
            this.saveMyCar(data);
          },
        },
      ],
    });

    await alert.present();
  }

  saveMyCar(data: any): void {
    if (this.userId) {
      data.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());
      data.userId = this.userId;
      data.uid = generateGUID();
      this.userCarsRef.add(data).then(() => {
        this.presentAlert();
        this.isInUsedUpdatOthers(data);
      });
    } else {
      this.presentToast();
    }
  }

  async isInUsedUpdatOthers(data) {
    if (data.insUsed) {
      const allCars = this.onMyCars.getValue();
      allCars.forEach(cars => {
        if (cars.uid !== data.uid) {
          this.userCarsRef.doc(cars.key).update({
            insUsed: false
          }).then(() => { });
        }
      });
    }
    console.log('cooooool', this.onMyCars.getValue());
  }

  insertNewCars(data: any) {
    this.useRightAway(data);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please Login again session token null',
      duration: 3000,
    });
    toast.present();
  }

  userChecker(): void {
    var user = firebase.auth().currentUser;
    console.log(user);
  }

  getmyCars = () => {
    const cars = firebase
      .firestore()
      .collection('newMyCars')
      .where('userId', '==', this.userId);
    cars.onSnapshot((snapshot) => {
      const myCars = snapshot.docs.map((car) => ({
        key: car.id,
        ...car.data(),
      }));
      this.onMyCars.next(myCars);
    });
  };
}
