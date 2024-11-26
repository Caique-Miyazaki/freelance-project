import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/cadastroProjeto.css";

const CadastraProjeto = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [minValue, setMinValue] = useState("");
  const [minDeadline, setMinDeadline] = useState("");
  const [projectClosure, setProjectClosure] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  const availableSkills = ["Python", "Java", "JavaScript", "React", "Cypress"];

  const handleAddSkill = () => {
    if (skillInput.trim() && !selectedSkills.includes(skillInput.trim())) {
      setSelectedSkills([...selectedSkills, skillInput.trim()]);
    }
    setSkillInput(""); // Limpa o campo de input após adicionar
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills((prev) => prev.filter((item) => item !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      companyName, // Incluído corretamente
      projectName,
      minValue,
      minDeadline,
      projectClosure,
      skills: selectedSkills,
      description: projectDescription,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/register_project",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("Projeto cadastrado com sucesso!");
        navigate("/listarPropostas");
      } else {
        console.error("Erro ao cadastrar o projeto.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <div className="page-cadastro">
      <form onSubmit={handleSubmit}>
        {/* Nome da Empresa */}
        <div className="input-name">
          <label htmlFor="companyName">Nome da Empresa:</label>
          <input
            type="text"
            id="companyName"
            placeholder="Digite o nome da empresa"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>

        {/* Nome do Projeto */}
        <div className="input-name">
          <label htmlFor="projectName">Nome do Projeto:</label>
          <input
            type="text"
            id="projectName"
            placeholder="Digite o nome do projeto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        {/* Valor e Prazo */}
        <div className="input-field">
          <label htmlFor="minValue">Valor Mínimo:</label>
          <input
            type="number"
            id="minValue"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            placeholder="Exemplo: 1000"
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="minDeadline">Prazo Mínimo:</label>
          <input
            type="date"
            id="minDeadline"
            value={minDeadline}
            onChange={(e) => setMinDeadline(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="projectClosure">Fechamento do Projeto:</label>
          <input
            type="date"
            id="projectClosure"
            value={projectClosure}
            onChange={(e) => setProjectClosure(e.target.value)}
            required
          />
        </div>

        {/* Skills */}
        <div className="skills-selector">
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            list="skill-options"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Digite ou selecione uma skill"
          />
          <datalist id="skill-options">
            {availableSkills.map((skill) => (
              <option key={skill} value={skill} />
            ))}
          </datalist>
          <button type="button" onClick={handleAddSkill}>
            Adicionar Skill
          </button>
        </div>

        {/* Exibe Skills Selecionadas */}
        <div className="selected-skills">
          {selectedSkills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="remove-skill"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Descrição */}
        <div className="input-description">
          <label htmlFor="description">Descrição do Projeto:</label>
          <textarea
            id="description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Descreva o projeto"
            rows="5"
            required
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default CadastraProjeto;
