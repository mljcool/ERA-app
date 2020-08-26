import { firebase } from '../firebase/firebase.config';
import { generateGUID } from 'src/app/utils/uidGenerator';

const firestoreRef = firebase.firestore();

export const saveRatings = (data: any = {}) => {
  data.ratingUID = generateGUID();
  data.dateCreated = firebase.firestore.Timestamp.fromDate(new Date());
  const saveData = firestoreRef.collection('newRatings').add(data);
  return saveData;
};

export const totalAvgRatings = (ratings) => {
  let totalWeight = 0;
  let totalReviews = 0;

  ratings.forEach((rating) => {
    const weightMultipliedByNumber = rating.weight * rating.count;
    totalWeight += weightMultipliedByNumber;
    totalReviews += rating.count;
  });

  const averageRating = totalWeight / totalReviews;

  return averageRating.toFixed(2);
};

export const getTotalRatingByShop = (shopId: string) => {
  return new Promise((resolve) => {
    const counterRate = (newData, rateType) => {
      return newData.filter((data) => data.ratings === rateType).length;
    };

    const user = firebase
      .firestore()
      .collection('newRatings')
      .where('shopId', '==', shopId);
    user.onSnapshot((snapshot) => {
      const allRate = snapshot.docs.map((users) => ({
        key: users.id,
        ...users.data(),
      }));

      const newRatings = [
        {
          weight: 5,
          count: counterRate(allRate, 5),
        },
        {
          weight: 4,
          count: counterRate(allRate, 4),
        },
        {
          weight: 3,
          count: counterRate(allRate, 3),
        },
        {
          weight: 2,
          count: counterRate(allRate, 2),
        },
        {
          weight: 1,
          count: counterRate(allRate, 1),
        },
      ];
      resolve(totalAvgRatings(newRatings));
    });
  });
};
