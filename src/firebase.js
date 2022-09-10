import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTyRcjdRtvK8QAxMW9nNofZNO8VapsTM0",
  authDomain: "fir-login-4b5cd.firebaseapp.com",
  projectId: "fir-login-4b5cd",
  storageBucket: "fir-login-4b5cd.appspot.com",
  messagingSenderId: "795700937180",
  appId: "1:795700937180:web:04a26f0795a17027e64f19"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, provider, db };
