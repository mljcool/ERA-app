import { firebase } from '../firebase/firebase.config';

export const getShopServices = (shopId: string) => {
  return firebase
    .firestore()
    .collection('newShopServices')
    .where('shopuid', '==', shopId);
};

export const getService = (id: string) => {
  return firebase
    .firestore()
    .collection('newShopServices')
    .where('id', '==', id);
};
