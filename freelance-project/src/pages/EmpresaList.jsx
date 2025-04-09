import { useEffect, useState } from "react";

const EmpresasPage = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/empresas")
      .then((response) => response.json())
      .then((data) => {
        setEmpresas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar empresas:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Lista de Empresas</h1>
      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.id}>
            <strong>{empresa.nome || "Empresa sem nome"}</strong> -{" "}
            {empresa.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmpresasPage;
