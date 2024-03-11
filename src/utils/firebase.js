// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZqumi4UPrGMonbLUw1dCyHV0u9PsB-GI",
  authDomain: "netpro-b40a4.firebaseapp.com",
  projectId: "netpro-b40a4",
  storageBucket: "netpro-b40a4.appspot.com",
  messagingSenderId: "922593449358",
  appId: "1:922593449358:web:f9ac9bbcd8ca350a8f80df",
  measurementId: "G-RRCEKXE2DZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
