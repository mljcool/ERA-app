import { generateGUID } from 'src/app/utils/uidGenerator';
import { firebase } from '../firebase/firebase.config';

export const saveOrders = (data: any = {}) => {
  data.transactionUID = generateGUID();
  data.type = 'ORDERS';
  data.status = 'PENDING';
  data.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());
  console.log('saveOrders', data);
  return firebase
    .firestore()
    .collection('newShopTransaction')
    .add(data);
};
