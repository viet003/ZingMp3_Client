import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBf7ag2O6P9BSiB_J8XwY0bA4PQMOOfIEs",
    authDomain: "music-app-c86fa.firebaseapp.com",
    projectId: "music-app-c86fa",
    storageBucket: "music-app-c86fa.appspot.com",
    messagingSenderId: "942299970478",
    appId: "1:942299970478:web:52fe3704f2eef99422e63f",
    measurementId: "G-5NZGG95YK8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { analytics, auth }


