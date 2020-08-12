import { Injectable } from '@angular/core';
import '@codetrix-studio/capacitor-google-auth';
import { GoogleUser } from 'src/app/models/googleUser.model';
import { Plugins } from '@capacitor/core';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { checkUserExist, saveUser } from 'src/app/core/configs/firebaseRef/UserCore';

const { GoogleAuth } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;
  private dbPath = '/newCustomers';
  userRef: AngularFirestoreCollection<any> = null;



  constructor(private afs: AngularFirestore, private googleStorageUser: StoragUserDataService) {

    this.userRef = afs.collection(this.dbPath);
  }


  checkUserIfRegistered(emailAddress) {
    this.userRef.ref.doc('').isEqual(emailAddress).valueOf
  }

  async login(): Promise<boolean> {
    const googleUser: GoogleUser = await GoogleAuth.signIn();
    if (googleUser && googleUser.authentication.idToken) {
      checkUserExist(googleUser.email).then((response) => {
        if (!response) {
          saveUser(googleUser).then(() => {
            this.googleStorageUser.setObjectGoogleUsers(googleUser);
            this._userIsAuthenticated = true;
          })
        }
      });
    }
    return Promise.resolve(this._userIsAuthenticated);
  }

  async logout(): Promise<boolean> {
    this._userIsAuthenticated = false;
    const googleUser: GoogleUser = await GoogleAuth.signOut();
    console.log(googleUser);
    return Promise.resolve(this._userIsAuthenticated);
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }
}
