import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyARSAK-kKHrOvQDEVKUcYD_fUXXsIwnwUI",
    authDomain: "financetracker-4829a.firebaseapp.com",
    projectId: "financetracker-4829a",
    storageBucket: "financetracker-4829a.appspot.com",
    messagingSenderId: "933434501154",
    appId: "1:933434501154:web:d9d27d35b035f00de5c27b"
  }

// initilaize firebase
firebase.initializeApp(firebaseConfig)

// initilaize services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timestamp = firebase.firestore.Timestamp
export { projectFirestore, projectAuth, timestamp } 