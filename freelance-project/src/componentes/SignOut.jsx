import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Limpar dados de autenticação (como token) do localStorage ou sessionStorage
    localStorage.removeItem("authToken"); // Caso esteja usando o localStorage para armazenar o token
    sessionStorage.removeItem("authToken"); // Caso esteja usando sessionStorage

    // Redirecionar para a página de login após o logout
    navigate("/login");
  };

  return (
    <button onClick={handleSignOut} className="sign-out-button">
      Sair
    </button>
  );
};

export default SignOut;
