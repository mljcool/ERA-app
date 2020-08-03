import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Injectable } from '@angular/core';
import { firebase } from '../firebase/firebase.config';

@Injectable({
  providedIn: 'root',
})
export class StoreServices {
  getMassiveData(uid: string) {
    const newShopList = firebase.firestore().collection('newShopList').where('uid', '==', uid);
    newShopList.onSnapshot((snapshot) => {
      const allShop = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }))[0];

    });

    const newShopServices = firebase.firestore().collection('newShopServices').where('shopuid', '==', uid);
    newShopServices.onSnapshot((snapshot) => {
      const allServices = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }));

    });

    const newShopProducts = firebase.firestore().collection('newShopProducts').where('shopuid', '==', uid);
    newShopProducts.onSnapshot((snapshot) => {
      const allProducts = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }));

      console.log(allProducts);
    });

    const newShopMechanics = firebase.firestore().collection('newShopMechanics').where('shopuid', '==', uid);
    newShopMechanics.onSnapshot((snapshot) => {
      const allMechanics = snapshot.docs.map((shop) => ({
        key: shop.id,
        ...shop.data(),
      }));

      console.log(allMechanics);
    });
  }
}
