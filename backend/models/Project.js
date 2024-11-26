// models/projectModel.js
const admin = require("firebase-admin");
const db = admin.firestore();
const { v4: uuidv4 } = require("uuid");

const registerProject = async (projectData) => {
  const {
    projectName,
    minValue,
    minDeadline,
    projectClosure,
    projectImage,
    skills,
    description,
  } = projectData;

  try {
    const projectId = uuidv4(); // Gerar ID único para o projeto
    await db.collection("projects").doc(projectId).set({
      projectName,
      minValue,
      minDeadline,
      projectClosure,
      projectImage,
      skills,
      description,
    });

    return { projectId, message: "Projeto registrado com sucesso!" };
  } catch (error) {
    console.error("Erro ao registrar o projeto:", error);
    throw new Error("Erro ao registrar projeto.");
  }
};

module.exports = { registerProject };
