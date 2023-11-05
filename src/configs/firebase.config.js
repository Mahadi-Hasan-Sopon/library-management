// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBNlvSn3a5CTeK2EUsd4oNj7i8ibHM2rII",
//   authDomain: "encyclopaedia-97061.firebaseapp.com",
//   projectId: "encyclopaedia-97061",
//   storageBucket: "encyclopaedia-97061.appspot.com",
//   messagingSenderId: "329022240679",
//   appId: "1:329022240679:web:56e3b90df76b2bda0f6882",
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
