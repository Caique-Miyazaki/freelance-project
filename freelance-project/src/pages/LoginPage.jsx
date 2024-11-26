import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import auth, { db } from "../firebaseConfig/firebase.js"; // Firebase Configuração correta
import PropTypes from "prop-types"; // Importação do PropTypes
import "./Styles/login.css";
import logo from "../assets/favicon.ico";

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      // Login com Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userUID = userCredential.user.uid;

      // Busca o usuário no Firestore usando o UID correto
      const q = query(
        collection(db, "users"),
        where("firebaseUid", "==", userUID)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const userType = userData.userType;

        // Atualiza estado e redireciona
        setUser({ email, userType });
        if (userType === "freelancer") {
          navigate("/vagas");
        } else if (userType === "empresa") {
          navigate("/CadastrarProjeto");
        }
      } else {
        setError("Usuário não encontrado no banco de dados.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("Email ou senha inválidos.");
      } else {
        setError("Erro ao tentar autenticar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const register = () => {
    navigate("/register");
  };

  return (
    <div className="login-wrapper">
      <div className="container-login">
        <img src={logo} alt="Logo" />
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          className="input-password-email"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-password-email"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="container-btn">
          <button onClick={handleLogin} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
          <button onClick={register}>Registre-se</button>
          <button id="forget-pass">Esqueci a senha</button>
        </div>
      </div>
    </div>
  );
};

// Adicionando o PropTypes para validar o tipo da prop
LoginPage.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginPage;
