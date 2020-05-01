// Zanim zaczniesz używać usług Firebase, skopiuj i wklej poniższe skrypty na końcu tagu <body>:
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

  var firebaseConfig = {
    apiKey: "AIzaSyBYad-jIHhVbYIp-hHvUhL2x41MCjpaLDE",
    authDomain: "psm-spa.firebaseapp.com",
    databaseURL: "https://psm-spa.firebaseio.com",
    projectId: "psm-spa",
    storageBucket: "psm-spa.appspot.com",
    messagingSenderId: "341296659662",
    appId: "1:341296659662:web:e47498160b6fe64db8a49f",
    measurementId: "G-P8QL6MBDL6"
  };
  
  firebase.initializeApp(firebaseConfig);
  //var db = firebase.firestore();

