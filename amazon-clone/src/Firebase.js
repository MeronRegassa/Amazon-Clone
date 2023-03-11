
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDxzpFsJhvVHVWnBfV6meFtootRhuxYzJE",
  authDomain: "clone-1a014.firebaseapp.com",
  projectId: "clone-1a014",
  storageBucket: "clone-1a014.appspot.com",
  messagingSenderId: "140802506874",
  appId: "1:140802506874:web:18ce7ccd51ea78d3183bc3",
};


// initializing our firebase app based on firbaseConfig
 firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
 const auth = firebase.auth();


 


//accessing the firebase database 
// export const db = getFirestore(firebaseApp);
// export const auth = getAuth(firebaseApp);

// export function signUp(email, password) {
//     return createUserWithEmailAndPassword(auth, email, password);
// }


export { db, auth };

export default firebase;
