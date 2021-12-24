import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtIn--dnXxVFP4FU_VhcN58NsusA6WEjc",
  authDomain: "itd-dda-assg2-database.firebaseapp.com",
  databaseURL: "https://itd-dda-assg2-database-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "itd-dda-assg2-database",
  storageBucket: "itd-dda-assg2-database.appspot.com",
  messagingSenderId: "953793489065",
  appId: "1:953793489065:web:423c8f4fee4f7907fe61b8",
  measurementId: "G-NEVY2PJB9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
