import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./vagasPage.css";

const VagasPage = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para filtros
  const [selectedSkill, setSelectedSkill] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  // Função para buscar as vagas do backend
  const vagasFetch = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      if (!res.ok) throw new Error("Falha na requisição");

      const data = await res.json();
      setVagas(data);
    } catch (erro) {
      setError(erro.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para aplicar filtros
  const applyFilters = () => {
    return vagas.filter((vaga) => {
      const isSkillMatch = selectedSkill
        ? vaga.skills.includes(selectedSkill)
        : true;
      const isValueMatch =
        (minValue ? vaga.minValue >= minValue : true) &&
        (maxValue ? vaga.minValue <= maxValue : true);
      return isSkillMatch && isValueMatch;
    });
  };

  useEffect(() => {
    vagasFetch();
  }, []);

  const filteredVagas = applyFilters();

  // Renderização
  if (loading) return <p>Carregando vagas...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="serviços">
      {/* Filtro */}
      <div className="filter">
        <label>Filtrar por Habilidade:</label>
        <select
          onChange={(e) => setSelectedSkill(e.target.value)}
          value={selectedSkill}
        >
          <option value="">Todas</option>
          {["Python", "JavaScript", "React", "Java", "C++"].map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        {/* Filtro de Valor Mínimo */}
        <label>Valor Mínimo:</label>
        <input
          type="number"
          placeholder="Digite o valor mínimo"
          value={minValue}
          onChange={(e) => setMinValue(e.target.value)}
        />

        {/* Filtro de Valor Máximo */}
        <label>Valor Máximo:</label>
        <input
          type="number"
          placeholder="Digite o valor máximo"
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
        />
      </div>

      {/* Container das vagas */}
      <div className="vagas-container">
        {/* Exibindo as vagas filtradas */}
        {filteredVagas.length === 0 ? (
          <p>Nenhuma vaga encontrada com os filtros aplicados.</p>
        ) : (
          filteredVagas.map((vaga) => (
            <div className="vagas" key={vaga.projectId}>
              <h1>{vaga.companyName}</h1>
              <h2>{vaga.projectName}</h2>

              <p>{vaga.description}</p>
              <p>
                <strong>Criado em:</strong>{" "}
                {new Date(vaga.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Data mínima:</strong> {vaga.minDeadline}
              </p>
              <p>
                <strong>Valor mínimo:</strong> R$ {vaga.minValue}
              </p>
              <p>
                <strong>Data de fechamento:</strong> {vaga.projectClosure}
              </p>

              <h3>Habilidades:</h3>
              <ul>
                <strong>
                  {vaga.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </strong>
              </ul>

              <div className="btn-">
                <Link to={`/vagas/proposta/${vaga.projectId}`}>
                  <button id="btn">Entre em contato</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VagasPage;
