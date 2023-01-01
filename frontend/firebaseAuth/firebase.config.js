import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAXY0wjEF7GdTxRMTpr-x4rxl_PUbCvKtQ',
  authDomain: 'mockify-e9b10.firebaseapp.com',
  projectId: 'mockify-e9b10',
  storageBucket: 'mockify-e9b10.appspot.com',
  messagingSenderId: '203674449425',
  appId: '1:203674449425:web:f1fff20910897d5fbbe3b0',
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
