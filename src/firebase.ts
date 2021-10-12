import firebase from "firebase/app";

// TODO import auth as needed
import "firebase/firestore";

// Get the Firebase config from the auto generated file.
import config from "./keys/firebase.json";

// Instantiate a Firebase app.
const app = firebase.initializeApp(config);
export const database = app.firestore();
database.settings({
  timestampsInSnapshots: true,
});
