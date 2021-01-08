import * as firebase from 'firebase';

import "firebase/database";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBtL4hWRwKlIgPxPcyUeC0ni_BEpAcvng0",
    authDomain: "nuscheduler-b2169.firebaseapp.com",
    databaseURL: "https://nuscheduler-b2169-default-rtdb.firebaseio.com",
    projectId: "nuscheduler-b2169",
    storageBucket: "nuscheduler-b2169.appspot.com",
    messagingSenderId: "333717774513",
    appId: "1:333717774513:web:9815afe40df033c9114290",
    measurementId: "G-F8EJC2445P"
  };

firebase.initializeApp(firebaseConfig);

export { firebase };