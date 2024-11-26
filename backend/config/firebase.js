const admin = require("firebase-admin");
const serviceAccount = require("./firebase_config.json"); // Caminho para o seu arquivo de credenciais

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "freelancer-project-63bd9", // Adicione esta linha
});

const db = admin.firestore(); // Acessando o Firestore

module.exports = { admin, db };
