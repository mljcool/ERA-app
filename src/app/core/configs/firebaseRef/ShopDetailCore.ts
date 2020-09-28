import { firebase } from '../firebase/firebase.config';

export const getShopDetails = (shopId: string) => {
  return firebase
    .firestore()
    .collection('newShopList')
    .where('uid', '==', shopId);
};
