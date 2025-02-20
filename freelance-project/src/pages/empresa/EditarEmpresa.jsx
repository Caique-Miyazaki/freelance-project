import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const EditarEmpresa = () => {
  const [userId, setUserId] = useState(""); // ID da empresa logada
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Obtém o ID do usuário logado
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Armazena o UID da empresa logada
      } else {
        setError("Nenhuma empresa está logada.");
      }
    });

    return () => unsubscribe(); // Limpa o listener quando o componente é desmontado
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("Erro ao obter o ID da empresa logada.");
      return;
    }

    if (!name && !email && !password) {
      setError("Pelo menos um campo deve ser preenchido para edição.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/edit_empresa/${userId}`, // Aqui userId == firebaseUid
        {
          name,
          email,
          password,
        }
      );

      setMessage(response.data.message);
      setError("");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setMessage("");
      setError(
        err.response?.data?.error || "Ocorreu um erro ao editar a empresa."
      );
    }
  };

  return (
    <div className="editar-empresa">
      <h2>Editar Empresa</h2>
      {userId ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Novo nome"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Novo email"
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nova senha"
            />
          </div>
          <button type="submit">Salvar Alterações</button>
        </form>
      ) : (
        <p>Carregando informações da empresa logada...</p>
      )}

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EditarEmpresa;
