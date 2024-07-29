import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyCUwKIGk3eM9AhLGEfOu4Xgo8l80X1feS4",
  authDomain: "instagram-b3e0f.firebaseapp.com",
  projectId: "instagram-b3e0f",
  storageBucket: "instagram-b3e0f.appspot.com",
  messagingSenderId: "13219161059",
  appId: "1:13219161059:web:9951058c300286accef6d6",
  measurementId: "G-84B3D2F4H7",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAUa3lcAueM17I_NAdAIx-Nb7wH-7ccknw",
//   authDomain: "web-ig.firebaseapp.com",
//   projectId: "web-ig",
//   storageBucket: "web-ig.appspot.com",
//   messagingSenderId: "362180776239",
//   appId: "1:362180776239:web:d39c0605e4d85261f6d1da",
//   measurementId: "G-4DXL6GGL16"
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, firestore, storage, analytics  };
