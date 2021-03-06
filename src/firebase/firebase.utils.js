import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBkmp8kax6Prd1EyqLPwNAHjlpLpTHs0c0",
  authDomain: "crwn-db-2506f.firebaseapp.com",
  projectId: "crwn-db-2506f",
  storageBucket: "crwn-db-2506f.appspot.com",
  messagingSenderId: "665359052512",
  appId: "1:665359052512:web:9eb91c38e8813081b22a85",
  measurementId: "G-PKF85F6Q0V",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("💥 error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
