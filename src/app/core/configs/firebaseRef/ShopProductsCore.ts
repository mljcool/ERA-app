import { firebase } from '../firebase/firebase.config';

export const getShopProducts = (shopId: string) => {
  return firebase
    .firestore()
    .collection('newShopProducts')
    .where('shopuid', '==', shopId);
};
