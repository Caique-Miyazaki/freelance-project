import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./vagasPage.css";

const VagasPage = () => {
  const [vagas, setVagas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar as vagas do backend
  const vagasFetch = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects");
      if (!res.ok) throw new Error("Falha na requisição");

      const data = await res.json();
      console.log(data);
      setVagas(data);
    } catch (erro) {
      setError(erro.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    vagasFetch();
  }, []);

  // Renderização
  if (loading) return <p>Carregando vagas...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="serviços">
      {vagas.map((vaga) => (
        <div className="vaga" key={vaga.projectId}>
          <h1>{vaga.companyName}</h1>
          <h2>{vaga.projectName}</h2>

          {/* Exibindo a descrição */}
          <p>{vaga.description}</p>

          {/* Exibindo a data de criação */}
          <p>
            <strong>Criado em:</strong>{" "}
            {new Date(vaga.createdAt).toLocaleDateString()}
          </p>

          {/* Exibindo o prazo mínimo */}
          <p>
            <strong>Data mínima:</strong> {vaga.minDeadline}
          </p>

          {/* Exibindo o valor mínimo */}
          <p>
            <strong>Valor mínimo:</strong> R$ {vaga.minValue}
          </p>

          {/* Exibindo a data de fechamento */}
          <p>
            <strong>Data de fechamento:</strong> {vaga.projectClosure}
          </p>
          <p>Habilidades:</p>
          <ul>
            {vaga.skills.map((skill, index) => (
              <li key={index}>{skill}</li> // Lista as habilidades
            ))}
          </ul>

          {/* Exibindo a imagem do projeto */}
          <img src={vaga.projectImage} alt={vaga.projectName} />

          <div className="btn-">
            <Link to={`/chat/${vaga.projectId}`}>
              <button id="btn">Entre em contato</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VagasPage;
