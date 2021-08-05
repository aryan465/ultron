

const firebase = require('firebase')

const firebaseApp = firebase.initializeaApp({
    apiKey: "AIzaSyD_GFojKR7ZZYXdfEJL9MqNBnCG5l2ev2k",
    authDomain: "ultron-e5b33.firebaseapp.com",
    projectId: "ultron-e5b33",
    storageBucket: "ultron-e5b33.appspot.com",
    messagingSenderId: "223680264269",
    appId: "1:223680264269:web:3bf09790b60b15d69ec404",
    measurementId: "G-WSKG4JWJM9"
})

const db = firebase.firestore()

const storage = firebase.storage()

exports.db = db;
exports.storage = storage;