import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDgsmz-8E4VmH1WOlpypQOqTUmtH5nHcK8",
    authDomain: "spark2020.firebaseapp.com",
    databaseURL: "https://spark2020.firebaseio.com",
    projectId: "spark2020",
    storageBucket: "spark2020.appspot.com",
    messagingSenderId: "34032245721",
    appId: "1:34032245721:web:9f9d8c66eee0afb3ff17c8",
    measurementId: "G-MKMMWSZC5E"
}

firebase.initializeApp(config);

export const auth = firebase.auth;
export const db = firebase.database();
export const fs = firebase.firestore();
export const store = firebase.storage();