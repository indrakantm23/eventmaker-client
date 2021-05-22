import firebase from 'firebase';
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCth3_0hUiRnCmjE4RMSnS1m6en6qrI7N8",
  authDomain: "myeventsmakers.firebaseapp.com",
  projectId: "myeventsmakers",
  storageBucket: "myeventsmakers.appspot.com",
  messagingSenderId: "158122927556",
  appId: "1:158122927556:web:e042494721aa992534f091",
  measurementId: "G-QW73V978LF"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };

