// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBdtbX7xLrM9B3w20SwaEZUMw0DEU-37IM',
  authDomain: 'swinger-3f970.firebaseapp.com',
  projectId: 'swinger-3f970',
  storageBucket: 'swinger-3f970.appspot.com',
  messagingSenderId: '1088866938327',
  appId: '1:1088866938327:web:e1d1c22e9ca5d119c9af92',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
