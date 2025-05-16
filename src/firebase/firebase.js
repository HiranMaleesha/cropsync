// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXetfFd5NMVTWBkonK2EuXdBSUyeuOkqs",
  authDomain: "cropsync-1344e.firebaseapp.com",
  projectId: "cropsync-1344e",
  storageBucket: "cropsync-1344e.firebasestorage.app",
  messagingSenderId: "1029446857214",
  appId: "1:1029446857214:web:ba63e9ec9a8e61dac410af",
  measurementId: "G-NGR9GBY1RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app, auth};