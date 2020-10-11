import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
   apiKey: "AIzaSyAtlRYWcMOEBNWdTQWgJYDwUi5x1lOGBoQ",
   authDomain: "alnasershop.firebaseapp.com",
   databaseURL: "https://alnasershop.firebaseio.com",
   projectId: "alnasershop",
   storageBucket: "alnasershop.appspot.com",
   messagingSenderId: "1093100832546",
   appId: "1:1093100832546:web:b0b51a4b0c4f61e4f4477b",
   measurementId: "G-PBLGYN3VS2"
 }
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData
      })
    }catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ 'prompt' : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;