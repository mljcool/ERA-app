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

export const getMyBookingDetails = (bookingUID: string) => {
  return firebase
    .firestore()
    .collection('newBookingTransaction')
    .where('bookingUID', '==', bookingUID);
};

export const cancelledBooking = (docId: string) => {
  return firebase
    .firestore()
    .collection('newBookingTransaction')
    .doc(docId)
    .update({ status: 'CANCELLED' });
};
