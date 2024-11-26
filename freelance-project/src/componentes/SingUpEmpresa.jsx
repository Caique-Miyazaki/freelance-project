import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/favicon.ico";
import "./signUpEmpresa.css";

const SignUpEmpresaPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (name.length < 3) {
      setError("O nome da empresa deve ter pelo menos 3 caracteres.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/register_user_empresa",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, userType: "empresa" }), // Enviando dados do tipo 'empresa'
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar conta.");
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      setError("Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-page">
      <img src={logo} alt="Logo" className="logoRegister" />
      <h2>Cadastro para Empresas</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="sign-up-form">
        <input
          type="text"
          placeholder="Nome da Empresa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="name"
          id="name"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="email"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          className="password"
        />
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Empresa"}
        </button>
      </form>
    </div>
  );
};

export default SignUpEmpresaPage;
