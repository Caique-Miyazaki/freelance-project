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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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
// Endpoint para obter as vagas criadas pela empresa
app.get("/api/empresa/vagas", async (req, res) => {
  const { companyUid } = req.query; // Recebe o companyUid da query

  if (!companyUid) {
    return res.status(400).json({ error: "companyUid não fornecido." });
  }

  try {
    // Busca as vagas no Firestore relacionadas ao companyUid
    const projectsSnapshot = await db
      .collection("projects")
      .where("firebaseUid", "==", companyUid)
      .get();

    const projects = projectsSnapshot.docs.map((doc) => doc.data());

    res.status(200).json(projects);
  } catch (error) {
    console.error("Erro ao buscar as vagas da empresa:", error);
    res.status(500).json({ error: "Erro ao buscar as vagas da empresa." });
  }
});

app.post("/api/candidatar", async (req, res) => {
  const { freelancerId, projectId, propostaValor, propostaData } = req.body;

  if (!freelancerId || !projectId || !propostaValor || !propostaData) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  try {
    const propostaId = uuidv4(); // Gerar um ID único para a proposta
    const propostaRef = db.collection("propostas").doc(propostaId);

    await propostaRef.set({
      freelancerId,
      projectId,
      propostaValor,
      propostaData,
      status: "Pendente", // Status inicial da proposta
      createdAt: new Date().toISOString(),
    });

    // Aqui você pode implementar a lógica para notificar a empresa, caso queira
    // Exemplo: envio de e-mail ou notificação para a empresa

    return res.status(201).json({
      message: "Proposta enviada com sucesso!",
      propostaId,
    });
  } catch (error) {
    console.error("Erro ao enviar proposta:", error);
    return res.status(500).json({ error: "Erro ao enviar proposta." });
  }
});

// Endpoint para a empresa visualizar as propostas de seus projetos
// app.get("/api/propostas", async (req, res) => {
//   const { projectId } = req.query;

//   if (!projectId) {
//     return res.status(400).json({ error: "O ID do projeto é obrigatório." });
//   }

//   try {
//     const snapshot = await db
//       .collection("propostas")
//       .where("projectId", "==", projectId)
//       .get();

//     const propostas = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     return res.json(propostas);
//   } catch (error) {
//     console.error("Erro ao buscar propostas:", error);
//     res.status(500).json({ error: "Erro ao buscar propostas." });
//   }
// });
app.get("/api/propostas", async (req, res) => {
  try {
    const snapshot = await db.collection("propostas").get();

    const propostas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return res.json(propostas); // Retorna todas as propostas
  } catch (error) {
    console.error("Erro ao buscar propostas:", error);
    res.status(500).json({ error: "Erro ao buscar propostas." });
  }
});

app.get("/api/projects/:projectId", async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ error: "ID do projeto é necessário." });
  }

  try {
    const projectDoc = await db.collection("projects").doc(projectId).get();

    if (!projectDoc.exists) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    return res.status(200).json(projectDoc.data());
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    return res.status(500).json({ error: "Erro ao buscar projeto." });
  }
});
// Exemplo de implementação com Express
app.patch("/api/propostas/:propostaId/status", async (req, res) => {
  const { propostaId } = req.params;
  const { status } = req.body;

  // Lógica para atualizar o status da proposta no banco de dados
  try {
    const proposta = await Proposta.findById(propostaId); // Supondo que você use um banco de dados NoSQL como MongoDB
    if (!proposta) {
      return res.status(404).json({ error: "Proposta não encontrada" });
    }

    proposta.status = status;
    await proposta.save(); // Atualiza a proposta no banco de dados

    res.status(200).json({ message: `Proposta ${status} com sucesso!` });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o status da proposta" });
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

// Endpoint para deletar empresa
app.delete("/api/delete_empresa/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: "ID da empresa não fornecido." });
  }

  try {
    // Deleta o usuário do Firebase Auth
    const userRecord = await admin.auth().getUser(userId);
    if (!userRecord) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }

    // Deleta o usuário do Firebase Auth
    await admin.auth().deleteUser(userId);

    // Deleta o usuário do Firestore
    await db.collection("users").doc(userId).delete();

    return res.status(200).json({ message: "Empresa deletada com sucesso!" });
  } catch (error) {
    console.error("Erro ao deletar empresa:", error);
    return res.status(500).json({ error: "Erro ao deletar empresa." });
  }
});

// Endpoint para editar empresa
app.patch("/api/edit_empresa/:firebaseUid", async (req, res) => {
  const { firebaseUid } = req.params;
  const { name, email, password } = req.body;

  if (!firebaseUid) {
    return res.status(400).json({ error: "firebaseUid não fornecido." });
  }

  if (!name && !email && !password) {
    return res
      .status(400)
      .json({ error: "Pelo menos um campo deve ser fornecido para edição." });
  }

  try {
    // Busca o documento no Firestore com base no firebaseUid
    const userSnapshot = await db
      .collection("users")
      .where("firebaseUid", "==", firebaseUid)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }

    const userDoc = userSnapshot.docs[0];
    const userId = userDoc.id; // Obtém o ID do documento no Firestore

    // Atualiza os dados da empresa no Firebase Authentication, se necessário
    if (email) {
      await admin.auth().updateUser(firebaseUid, { email });
    }
    if (password) {
      await admin.auth().updateUser(firebaseUid, { password });
    }

    // Atualiza os dados da empresa no Firestore
    const updatedData = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;

    await db.collection("users").doc(userId).update(updatedData);

    return res.status(200).json({ message: "Empresa atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao editar empresa:", error);
    return res.status(500).json({ error: "Erro ao editar empresa." });
  }
});

// Endpoint para listar empresas
app.get("/api/empresas", async (req, res) => {
  try {
    const snapshot = await db
      .collection("users")
      .where("userType", "==", "empresa")
      .get();

    const empresas = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(empresas);
  } catch (error) {
    console.error("Erro ao buscar empresas:", error);
    return res.status(500).json({ error: "Erro ao buscar empresas." });
  }
});

// Endpoint para excluir vaga
app.delete("/api/delete_project/:projectId", async (req, res) => {
  const { projectId } = req.params;

  if (!projectId) {
    return res.status(400).json({ error: "ID do projeto não fornecido." });
  }

  try {
    // Verifica se o projeto existe no Firestore
    const projectDoc = await db.collection("projects").doc(projectId).get();

    if (!projectDoc.exists) {
      return res.status(404).json({ error: "Projeto não encontrado." });
    }

    // Exclui o projeto do Firestore
    await db.collection("projects").doc(projectId).delete();

    return res.status(200).json({ message: "Projeto excluído com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir projeto:", error);
    return res.status(500).json({ error: "Erro ao excluir projeto." });
  }
});

app.get("/users", async (req, res) => {
  const currentUid = req.query.currentUid || "";
  try {
    const snapshot = await db.collection("users").get();
    const lista = snapshot.docs
      .filter(doc => {
        return doc.data().firebaseUid !== currentUid;
      })
      .map(doc => {
        const data = doc.data();
        return {
          uid: data.firebaseUid,
          name: data.name,
          email: data.email,
          userType: data.userType,
        };
      });

    return res.status(200).json(lista);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return res.status(500).json({ error: "Erro interno." });
  }
});

app.post("/chat/create", async (req, res) => {
  const { uid1, uid2 } = req.body;
  if (!uid1 || !uid2) {
    return res.status(400).json({ error: "uid1 e uid2 são obrigatórios." });
  }

  const chatId = [uid1, uid2].sort().join("_");
  try {
    const chatRef = db.collection("chats").doc(chatId);
    const chatDoc = await chatRef.get();

    if (!chatDoc.exists) {
      await chatRef.set({
        participants: [uid1, uid2],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
    return res.status(200).json({ chatId });
  } catch (error) {
    console.error("Erro ao criar/recuperar chat:", error);
    return res.status(500).json({ error: "Erro interno." });
  }
});

app.post("/chat/:chatId/message", async (req, res) => {
  const { chatId } = req.params;
  const { senderUid, text } = req.body;

  if (!senderUid || !text || !text.trim()) {
    return res.status(400).json({ error: "senderUid e text não podem ser vazios." });
  }

  try {
    const chatDoc = await db.collection("chats").doc(chatId).get();
    if (!chatDoc.exists) {
      return res.status(404).json({ error: "Chat não encontrado." });
    }

    const msgRef = await db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add({
        text,
        sender: senderUid,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });

    return res.status(201).json({ messageId: msgRef.id });
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    return res.status(500).json({ error: "Erro interno." });
  }
});

app.get("/chat/:chatId/messages", async (req, res) => {
  const { chatId } = req.params;

  try {
    const chatDoc = await db.collection("chats").doc(chatId).get();
    if (!chatDoc.exists) {
      return res.status(404).json({ error: "Chat não encontrado." });
    }

    const msgsSnapshot = await db
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .get();

    const msgs = msgsSnapshot.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        text: d.text,
        sender: d.sender,
        // timestamp pode ser convertido em ISO para o front
        timestamp: d.timestamp ? d.timestamp.toDate().toISOString() : null,
      };
    });

    return res.status(200).json(msgs);
  } catch (error) {
    console.error("Erro ao obter mensagens:", error);
    return res.status(500).json({ error: "Erro interno." });
  }
});

// Inicializar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
