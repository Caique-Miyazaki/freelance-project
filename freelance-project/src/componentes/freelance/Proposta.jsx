import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./proposta.css";

// Função para obter o freelancerId (UID do usuário autenticado)
const getFreelancerId = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user ? user.uid : null;
};

const Proposta = () => {
  const { projectId } = useParams(); // Pegando o projectId da URL
  const [project, setProject] = useState(null);
  const [proposal, setProposal] = useState({
    projectId: projectId,
    message: "",
    propostaValor: "",
    propostaData: "", // Adicionando o campo de data
    freelancerId: "", // Adicionando freelancerId aqui
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os detalhes do projeto
  const fetchProjectDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/projects/${projectId}`
      );
      if (!res.ok) throw new Error("Falha ao buscar o projeto");
      const data = await res.json();
      setProject(data);

      // Definindo valores iniciais no formulário com base nos dados do projeto
      setProposal({
        projectId: data.projectId,
        message: "",
        propostaValor: data.minValue, // Definindo o valor inicial como o valor mínimo da vaga
        propostaData: "", // Definindo a data inicialmente vazia
        freelancerId: getFreelancerId(), // Definindo o freelancerId aqui
      });
    } catch (erro) {
      setError(erro.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  // Função para enviar a proposta
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/candidatar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposal),
      });

      if (!res.ok) throw new Error("Falha ao enviar a proposta");

      alert("Proposta enviada com sucesso!");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p>Carregando detalhes do projeto...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="maior">
      <h1>Enviar Proposta para o Projeto</h1>

      {project && (
        <div>
          <h2>{project.projectName}</h2>
          <p>{project.description}</p>
          <p>
            <strong>Valor Mínimo:</strong> R$ {project.minValue}
          </p>
          <p>
            <strong>Data Mínima:</strong> {project.minDeadline}
          </p>
          <p>
            <strong>Data de Fechamento:</strong> {project.projectClosure}
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="message">Mensagem:</label>
              <textarea
                id="message"
                name="message"
                value={proposal.message}
                onChange={(e) =>
                  setProposal({ ...proposal, message: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="value">Proposta de Valor:</label>
              <input
                type="number"
                id="value"
                name="value"
                value={proposal.propostaValor}
                onChange={(e) =>
                  setProposal({ ...proposal, propostaValor: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label htmlFor="date">Data de Execução:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={proposal.propostaData}
                onChange={(e) =>
                  setProposal({ ...proposal, propostaData: e.target.value })
                }
                required
              />
            </div>

            <button type="submit">Enviar Proposta</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Proposta;
