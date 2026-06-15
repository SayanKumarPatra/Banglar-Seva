import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
// Initialize and export the firestore database instance
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
