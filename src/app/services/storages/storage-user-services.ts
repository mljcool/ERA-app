import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';
import { GoogleUser } from 'src/app/models/googleUser.model';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StoragUserDataService {
  async setObjectGoogleUsers(userValues: GoogleUser) {
    await Storage.set({
      key: 'googleUsers',
      value: JSON.stringify({
        id: userValues.id,
        name: userValues.name,
        familyName: userValues.familyName,
        givenName: userValues.givenName,
        email: userValues.email,
        imageUrl: userValues.imageUrl,
        isLogin: !!userValues.id as boolean
      })
    });
  }

  async getObjectGoogleUsers(): Promise<GoogleUser> {
    const ret = await Storage.get({ key: 'googleUsers' });
    const user = JSON.parse(ret.value);
    return user;
  }

  async clearUserStorage() {
    await Storage.clear();
  }
}
