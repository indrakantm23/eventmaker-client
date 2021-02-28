import firebase from 'firebase';
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyD734E7WHyZ5B7oKwBUyPfpXbcXd7jg_90",
  authDomain: "eventsarounds.firebaseapp.com",
  projectId: "eventsarounds",
  storageBucket: "eventsarounds.appspot.com",
  messagingSenderId: "84406275971",
  appId: "1:84406275971:web:aa33efa9f80d23d77ff0b6",
  measurementId: "G-2LMXP6JMB2"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

