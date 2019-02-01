// react firebase package, allows mirroring
import Rebase from "re-base";

// anything that is not mirroring state, re-base needs this
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBgz51eFUcB-NV-C3YZO4xjz6fv9Fvz1jA",
  authDomain: "catch-of-the-day-ronan.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-ronan.firebaseio.com"
});

const db = firebaseApp.database();
const base = Rebase.createClass(db);

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
