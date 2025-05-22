// src/pages/EmpresasPage.jsx
import { useEffect, useState } from "react";
import "./empresasPage.css"; // importe o CSS

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

  if (loading) return <p className="loading">Carregando...</p>;

  return (
    <div className="empresas-page">
      {empresas.length === 0 ? (
        <p className="no-data">Nenhuma empresa cadastrada.</p>
      ) : (
        <div className="empresas-grid">
          {empresas.map((empresa) => (
            <div className="empresa-card" key={empresa.id}>
              <div className="card-header">
                <h2 className="empresa-name">
                  {empresa.name || "Empresa sem nome"}
                </h2>
              </div>
              <div className="card-body">
                <p className="empresa-email">{empresa.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmpresasPage;
