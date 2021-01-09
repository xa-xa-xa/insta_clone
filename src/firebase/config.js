import firebase from 'firebase/app';
import '@firebase/auth';
import '@firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebaseApiKey,
  authDomain: 'insta-clone-dev-3fc30.firebaseapp.com',
  projectId: 'insta-clone-dev-3fc30',
  storageBucket: 'insta-clone-dev-3fc30.appspot.com',
  messagingSenderId: '601633185558',
  appId: Constants.manifest.extra.firebaseAppId,
  measurementId: 'G-YSC22HZBMR',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
