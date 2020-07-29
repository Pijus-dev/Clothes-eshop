import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBoOSBkJan9g7tcaj9DXQJEboClBJrBdDk",
  authDomain: "react-shop-a5bdd.firebaseapp.com",
  databaseURL: "https://react-shop-a5bdd.firebaseio.com",
  projectId: "react-shop-a5bdd",
  storageBucket: "react-shop-a5bdd.appspot.com",
  messagingSenderId: "76107538522",
  appId: "1:76107538522:web:4dda95f69443880f21b863",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// creating an user account in the firestore
export const createUserProfile = async (userAuth, addInfo) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addInfo,
      });
    } catch (error) {}
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// using google auth to sign in the user
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
