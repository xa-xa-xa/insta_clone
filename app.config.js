import 'dotenv/config';

export default {
  name: 'CoolApp',
  version: '1.0.0',
  extra: {
      firebaseApiKey: process.env.REACT_NATIVE_FIREBASE_API_KEY,
      firebaseAppId: process.env.REACT_NATIVE_APP_ID
      
  },
};