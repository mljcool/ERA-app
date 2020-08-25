import { firebase } from '../firebase/firebase.config';
import { generateGUID } from 'src/app/utils/uidGenerator';

const firestoreRef = firebase.firestore();

export const saveRatings = (data: any = {}): Promise<any> => {
  data.userUID = generateGUID();
  data.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());
  const saveData = firestoreRef.collection('newRatings').add(data);
  return saveData;
};
