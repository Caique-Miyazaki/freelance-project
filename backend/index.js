const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");

// Inicialização do Firebase Admin SDK
const serviceAccount = require("./config/firebase_config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Configuração do servidor Express
const app = express();

// Middleware para configurar CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Substitua pela URL do seu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Permite o uso de cookies/sessões
  })
);

// Middleware para adicionar cabeçalhos de segurança (COOP/COEP)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

// Middleware para interpretar JSON no body das requisições
app.use(bodyParser.json());

// Endpoint para registro de freelancer
app.post("/register_user_freelancer", async (req, res) => {
  const { name, email, password, userType = "freelancer" } = req.body;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .json({ error: "O nome deve ter pelo menos 3 caracteres." });
  }
  if (!email || !password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Senha deve ter pelo menos 6 caracteres." });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    const userId = uuidv4();
    await db.collection("users").doc(userId).set({
      name,
      email,
      userType,
      firebaseUid: userRecord.uid,
    });

    return res.status(201).json({
      message: "Usuário freelancer registrado com sucesso!",
      userId,
    });
  } catch (error) {
    console.error("Erro ao registrar usuário freelancer:", error);
    return res
      .status(500)
      .json({ error: "Erro ao registrar usuário freelancer." });
  }
});

// Endpoint para registrar projeto
app.post("/api/register_project", async (req, res) => {
  const {
    companyName,
    projectName,
    minValue,
    minDeadline,
    projectClosure,
    skills,
    description,
  } = req.body;

  if (
    !companyName || // Verificar se companyName foi fornecido
    !projectName ||
    !minValue ||
    !minDeadline ||
    !skills ||
    skills.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Campos obrigatórios ausentes ou inválidos." });
  }

  if (!Array.isArray(skills)) {
    return res
      .status(400)
      .json({ error: "Skills deve ser um array de strings." });
  }

  try {
    const projectId = uuidv4();
    await db.collection("projects").doc(projectId).set({
      projectId,
      companyName, // Adiciona o companyName ao documento
      projectName,
      minValue,
      minDeadline,
      projectClosure,
      skills, // Salva como array
      description,
      createdAt: new Date().toISOString(),
    });

    return res.status(201).json({
      message: "Projeto registrado com sucesso!",
      projectId,
    });
  } catch (error) {
    console.error("Erro ao registrar projeto:", error);
    return res.status(500).json({ error: "Erro ao registrar projeto." });
  }
});

// Endpoint para obter projetos
app.get("/api/projects", async (req, res) => {
  try {
    const projectsSnapshot = await db.collection("projects").get();
    const projects = projectsSnapshot.docs.map((doc) => doc.data());
    res.status(200).json(projects);
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    res.status(500).json({ error: "Erro ao buscar projetos." });
  }
});

// Endpoint para registro de empresa
app.post("/register_user_empresa", async (req, res) => {
  const { name, email, password, userType = "empresa" } = req.body;

  if (!name || name.length < 3) {
    return res
      .status(400)
      .json({ error: "O nome da empresa deve ter pelo menos 3 caracteres." });
  }
  if (!email || !password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "Senha deve ter pelo menos 6 caracteres." });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });

    const userId = uuidv4();
    await db.collection("users").doc(userId).set({
      name,
      email,
      userType,
      firebaseUid: userRecord.uid,
    });

    return res.status(201).json({
      message: "Empresa registrada com sucesso!",
      userId,
    });
  } catch (error) {
    console.error("Erro ao registrar empresa:", error);
    return res.status(500).json({ error: "Erro ao registrar empresa." });
  }
});

// Endpoint para autenticação via Google
app.post("/google_auth", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: "ID Token não fornecido." });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    const userSnapshot = await db
      .collection("users")
      .where("firebaseUid", "==", uid)
      .get();

    if (userSnapshot.empty) {
      const userId = uuidv4();
      await db.collection("users").doc(userId).set({
        name,
        email,
        userType: "freelancer",
        firebaseUid: uid,
      });
    }

    return res.status(200).json({ message: "Autenticado com sucesso!" });
  } catch (error) {
    console.error("Erro na autenticação Google:", error);
    return res.status(500).json({ error: "Erro na autenticação Google." });
  }
});

// Inicializar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
