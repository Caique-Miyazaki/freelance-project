// controllers/projectController.js
const { registerProject } = require("../models/Project.js");

const registerProjectController = async (req, res) => {
  const {
    projectName,
    minValue,
    minDeadline,
    projectClosure,
    projectImage,
    skills,
    description,
  } = req.body;

  // Verificação básica de dados obrigatórios
  if (!projectName || !minValue || !minDeadline || !skills) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  try {
    // Chama o modelo para registrar o projeto
    const result = await registerProject({
      projectName,
      minValue,
      minDeadline,
      projectClosure,
      projectImage,
      skills,
      description,
    });

    // Retorna resposta com sucesso
    return res.status(201).json(result);
  } catch (error) {
    // Retorna erro se algo falhar
    return res
      .status(500)
      .json({ error: error.message || "Erro ao registrar projeto." });
  }
};

module.exports = { registerProjectController };
