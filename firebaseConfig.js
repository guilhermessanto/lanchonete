// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/* Importando recursos da biblioteca de autenticação do firebase */
import { getAuth } from "firebase/auth";

/* storage */
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACcAOIZQOyNvMutugb_AQd8QQnZJZved8",
  authDomain: "bd-lanchonelio.firebaseapp.com",
  databaseURL: "https://bd-lanchonelio-default-rtdb.firebaseio.com",
  projectId: "bd-lanchonelio",
  storageBucket: "bd-lanchonelio.appspot.com",
  messagingSenderId: "473521711114",
  appId: "1:473521711114:web:21f7b09ea30436f91f57f3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/* Exportando os recursos de autenticação da biblioteca */
export const auth = getAuth(app);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
