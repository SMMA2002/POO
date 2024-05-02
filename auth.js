// jshint esversion: 8
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// Inicializa Firebase (reemplaza con tu configuración)
const firebaseConfig = {
  apiKey: "AIzaSyBMAxJJo9yjFRKQt-nl9eC7fz9LblQZ3FQ",
  authDomain: "todo-9cb87.firebaseapp.com",
  projectId: "todo-9cb87",
  storageBucket: "todo-9cb87.appspot.com",
  messagingSenderId: "359557836961",
  appId: "1:359557836961:web:b778d7e48c009f9cc880e0"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

auth.languageCode = "es";

export async function login() {
  try {
    const response = await auth.signInWithPopup(provider);
    return response.user;
  } catch (error) {
    throw new Error(error);
  }
}

export function logout() {
  auth.signOut();
}
