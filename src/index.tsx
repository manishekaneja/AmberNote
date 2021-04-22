import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import "react-quill/dist/quill.snow.css";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { firebaseKeys } from "./firebase-keys";

// Initialin=zing Firebase App
firebase.initializeApp(firebaseKeys);

// Initializing global firebase objects
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;
const increment = firebase.firestore.FieldValue.increment(1);

export { projectFirestore, projectAuth, serverTimeStamp, increment };

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
