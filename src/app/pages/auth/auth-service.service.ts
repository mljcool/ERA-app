import { Injectable } from '@angular/core';
import '@codetrix-studio/capacitor-google-auth';
import { GoogleUser } from 'src/app/models/googleUser.model';
import { Plugins } from '@capacitor/core';
import { StoragUserDataService } from 'src/app/services/storages/storage-user-services';

const { GoogleAuth } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  // tslint:disable-next-line: variable-name
  private _userIsAuthenticated = false;

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }
  constructor(private googleStorageUser: StoragUserDataService) { }

  async login(): Promise<boolean> {
    const googleUser: GoogleUser = await GoogleAuth.signIn();
    if (googleUser && googleUser.authentication.idToken) {
      console.log('googleUser', googleUser);
      this.googleStorageUser.setObjectGoogleUsers(googleUser);
      this._userIsAuthenticated = true;
    }
    return Promise.resolve(this._userIsAuthenticated);
  }

  async logout(): Promise<boolean> {
    this._userIsAuthenticated = false;
    const googleUser: GoogleUser = await GoogleAuth.signOut();
    console.log(googleUser);
    return Promise.resolve(this._userIsAuthenticated);
  }
}
