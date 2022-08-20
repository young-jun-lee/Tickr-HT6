import firebase from "firebase"

const firebaseConfig = {
  apiKey: 'AIzaSyAZqvtH1avL8cGVt_mAtXWy8k6G2spV-iA',
  authDomain: 'react-tinder-clone-3be73.firebaseapp.com',
  projectId: 'react-tinder-clone-3be73',
  storageBucket: 'react-tinder-clone-3be73.appspot.com',
  messagingSenderId: '687163064175',
  appId: '1:687163064175:web:ae115e9f913d76d7e3729a',
  measurementId: 'G-SW8XPMK4GK',
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const database = firebaseApp.firestore();

export default database