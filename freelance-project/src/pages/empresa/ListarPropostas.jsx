import { useState, useEffect } from "react";
import "../vagasPage.css"; // Reaproveita o CSS do VagasPage

const PropostasPage = () => {
  const [propostas, setPropostas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar todas as propostas
  const fetchPropostas = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/propostas");
      if (!res.ok) throw new Error("Falha ao buscar propostas");

      const data = await res.json();
      setPropostas(data);
    } catch (erro) {
      setError(erro.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPropostas();
  }, []);

  const handleDecision = async (propostaId, decision) => {
    try {
      // Requisição para o backend para aceitar ou recusar a proposta
      const res = await fetch(
        `http://localhost:5000/api/propostas/${propostaId}/status`,
        {
          method: "PATCH", // Usando PATCH para atualizar o status da proposta
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: decision }), // Enviando o novo status para o backend
        }
      );

      if (!res.ok) throw new Error("Falha ao atualizar a proposta");

      // Caso a requisição tenha sucesso, removemos a proposta da lista no frontend
      setPropostas((prevPropostas) =>
        prevPropostas.filter((proposta) => proposta.propostaId !== propostaId)
      );

      console.log(`Proposta ${propostaId} foi ${decision}`);
    } catch (erro) {
      console.error("Erro na decisão:", erro);
      setError("Erro ao tomar a decisão");
    }
  };

  if (loading) return <p>Carregando propostas...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="serviços">
      {propostas.map((proposta) => (
        <div className="vaga" key={proposta.propostaId}>
          {/* Exibindo o nome do freelancer */}
          <h1>{proposta.freelancerName || "Freelancer desconhecido"}</h1>

          {/* Exibindo a mensagem da proposta */}
          <p>{proposta.message || "Sem mensagem fornecida."}</p>

          {/* Exibindo o valor da proposta */}
          <p>
            <strong>Valor:</strong> R$ {proposta.propostaValor || "N/A"}
          </p>

          {/* Exibindo a data limite */}
          <p>
            <strong>Data Limite:</strong>{" "}
            {proposta.propostaData
              ? new Date(proposta.propostaData).toLocaleDateString()
              : "Não especificada"}
          </p>

          {/* Exibindo a imagem associada, se houver */}
          {proposta.propostaImage && (
            <img
              src={proposta.propostaImage}
              alt={`Proposta ${proposta.propostaId}`}
            />
          )}

          {/* Botões de Aceitar e Recusar */}
          <div className="btn-">
            <button
              id="btn-aceitar"
              onClick={() => handleDecision(proposta.propostaId, "aceita")}
            >
              Aceitar
            </button>
            <button
              id="btn-recusar"
              onClick={() => handleDecision(proposta.propostaId, "recusada")}
            >
              Recusar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropostasPage;
