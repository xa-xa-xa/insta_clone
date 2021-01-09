import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'insta-clone-dev-3fc30.firebaseapp.com',
  projectId: 'insta-clone-dev-3fc30',
  storageBucket: 'insta-clone-dev-3fc30.appspot.com',
  messagingSenderId: '601633185558',
  appId: process.env.REACT_APP_APP_ID,
  measurementId: 'G-YSC22HZBMR',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
