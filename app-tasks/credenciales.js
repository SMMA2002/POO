import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCZFYCdxp_N3x6m_sWgApkRMm9qEiDTlh4",
  authDomain: "login-medipro.firebaseapp.com",
  projectId: "login-medipro",
  storageBucket: "login-medipro.appspot.com",
  messagingSenderId: "84758386792",
  appId: "1:84758386792:web:bb767cdb61adfb290283dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Obtener la instancia de autenticación

export { app, auth }; // Exportar app y auth