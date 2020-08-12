




import { firebase } from '../firebase/firebase.config';
import { generateGUID } from 'src/app/utils/uidGenerator';

const firestoreRef = firebase.firestore();

export const checkUserExist = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const user = firebase.firestore().collection('newCustomers').where('email', '==', email);
    user.onSnapshot((snapshot) => {
      const alluser = snapshot.docs.map((users) => ({
        key: users.id,
        ...users.data(),
      }));
      resolve(!!alluser.length);
    });
  });
}

export const saveUser = (data: any = {}): Promise<any> => {
  const saveData = firestoreRef.collection('newCustomers').add(data)
  return saveData;
}

