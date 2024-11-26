// Importando SDKs do Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCeT8JdwEjK9SkiP5FKH5zg12QFsCYFNZk",
  authDomain: "freelancer-project-63bd9.firebaseapp.com",
  projectId: "freelancer-project-63bd9",
  storageBucket: "freelancer-project-63bd9.appspot.com", // Corrigido o domínio do Storage Bucket
  messagingSenderId: "539297321439",
  appId: "1:539297321439:web:7f15183b5d4ec93ed1b46a",
  measurementId: "G-0H4SVVFXMP",
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Configurando Authentication e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Exportação do auth como default
export default auth;
export { db };
