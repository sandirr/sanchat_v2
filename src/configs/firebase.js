// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_dpDTHwKT6221dryM6n-VnIhLOHVjdoQ",
  authDomain: "sanchat-v2.firebaseapp.com",
  projectId: "sanchat-v2",
  storageBucket: "sanchat-v2.appspot.com",
  messagingSenderId: "180260616676",
  appId: "1:180260616676:web:e162ae1080ce698ad4aff1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestoreDB = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export const messaging = getMessaging(app)
export const generateToken = async () => {
  const data = await getToken(messaging, {vapidKey: 'BOpXhuOu_ibsGv2UP5OvroaZRu-W7p4sXRhncM2wpPsTEWoETe_LN-Ny9g4r6rylQytTZsHoXisZpMddpu80cQg'})
  return data
}