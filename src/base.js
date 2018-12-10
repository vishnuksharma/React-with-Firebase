import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB0qNGhTODk9dPhjwP3GSQDpxctdqRC0lY",
  authDomain: "catchoftheday-vishnu.firebaseapp.com",
  databaseURL: "https://catchoftheday-vishnu.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

// this is named export
export {firebaseApp}

export default base;