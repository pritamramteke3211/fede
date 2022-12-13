import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
