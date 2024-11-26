import auth from "../firebaseConfig/firebase"; // Importa o auth de firebase.js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/favicon.ico";
import logoGoogle from "../assets/google.png";
import "./signUpPage.css";

const SignUpPage = () => {
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
      setError("O nome deve ter pelo menos 3 caracteres.");
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
        "http://localhost:5000/register_user_freelancer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
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

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider(); // Google Auth Provider
      const result = await signInWithPopup(auth, provider); // SignIn com popup
      const user = result.user;

      // Obter o ID Token do usuário autenticado
      const idToken = await user.getIdToken();
      console.log("ID Token:", idToken);

      // Enviar o ID Token para o backend para verificação
      const response = await fetch("http://localhost:5000/google_auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar conta.");
      }

      alert("Cadastro realizado com sucesso!");
      navigate("/vagas");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Erro ao autenticar com o Google:", error);
    }
  };

  return (
    <div className="sign-up-page">
      <img src={logo} alt="Logo" className="logoRegister" />
      <h2>Cadastro de Freelancer</h2>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleGoogleSignIn} className="google-sign-in-button">
        <img src={logoGoogle} alt="Google" />
        Cadastrar com Google
      </button>
      <div className="separator">
        <span>OU</span>
      </div>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <input
          type="text"
          placeholder="Nome Completo"
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
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
