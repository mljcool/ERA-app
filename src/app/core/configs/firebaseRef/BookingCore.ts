import { generateGUID } from 'src/app/utils/uidGenerator';
import { firebase } from '../firebase/firebase.config';

export const saveBooking = (data: any = {}) => {
  data.bookingUID = generateGUID();
  data.type = 'BOOKING';
  data.status = 'PENDING';
  data.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());
  console.log('saveBooking', data);
  return firebase
    .firestore()
    .collection('newBookingTransaction')
    .add(data);
};

export const getMyBookings = (userUID: string) => {
  return firebase
    .firestore()
    .collection('newBookingTransaction')
    .where('userUID', '==', userUID);
};

// export const getMyOrdersDetails = (transactionUID: string) => {
//   return firebase
//     .firestore()
//     .collection('newShopTransaction')
//     .where('transactionUID', '==', transactionUID);
// };
