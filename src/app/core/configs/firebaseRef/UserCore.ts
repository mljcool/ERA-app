




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

export const getAccountDetails = (userId) => {
  const cars = firebase
    .firestore()
    .collection('newCustomers')
    .where('id', '==', userId);
  return cars;
};

export const saveUser = (data: any = {}): Promise<any> => {
  data.userUID = generateGUID();
  data.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());
  data.isNew = true;
  const saveData = firestoreRef.collection('newCustomers').add(data)
  return saveData;
}

export const writeUserData = (userId, data) => {
  return firebase.firestore().collection('newCustomers').doc(userId).update({
    address: { ...data }
  });
}


export const saveMobileNumber = (userId, mobile) => {
  return firebase.firestore().collection('newCustomers').doc(userId).update({
    mobileNumber: mobile,
    isNew: false,
  });
}


export const updateUserStatus = (userId) => {
  return firebase.firestore().collection('newCustomers').doc(userId).update({
    isNew: false,
  });
}
