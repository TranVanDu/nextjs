/**
 * Firebase Login
 * Reactify comes with built in firebase login feature
 * You Need To Add Your Firsebase App Account Details Here
 */
import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase 
const config = {
    apiKey: "AIzaSyB9XUiwHq5ijDnEX1FsgVcz3vLHgr2YQPk",
    authDomain: "stay-3ba75.firebaseapp.com",
    // databaseURL: "https://stay-3ba75.firebaseio.com",
    // projectId: "stay-3ba75",
    // storageBucket: "stay-3ba75.appspot.com",
    // messagingSenderId: "349570250039",
    // appId: "1:349570250039:web:846e488777948c57e756b2",
    // measurementId: "G-W2KTZHP34B"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
firebase.auth().useDeviceLanguage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
// const githubAuthProvider = new firebase.auth.GithubAuthProvider();
// const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
// const emailAuthProvider = new firebase.auth.EmailAuthProvider();
const phoneAuthProvider = new firebase.auth.PhoneAuthProvider();
const appleAuthProvider = new firebase.auth.OAuthProvider('apple.com');
// const database = firebase.database();

appleAuthProvider.addScope('email');
appleAuthProvider.addScope('name');

googleAuthProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// googleAuthProvider.setCustomParameters({
//     'login_hint': 'user@example.com'
// });

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("USER LOGGED IN");
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log("USER LOGGED OUT");
          }).catch((error) => {
            // An error happened.
            console.log("USER CAN NOT LOGGED OUT");
          });
    } else {
        // No user is signed in.
        console.log("USER NOT LOGGED IN");
    }
});

export {
    auth,
    googleAuthProvider,
    // githubAuthProvider,
    // facebookAuthProvider,
    // twitterAuthProvider,
    // database,
    // emailAuthProvider,
    phoneAuthProvider,
    appleAuthProvider,
    firebase
};
