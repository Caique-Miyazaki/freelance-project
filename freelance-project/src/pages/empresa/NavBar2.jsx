import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import axios from "axios"; // Importando o axios para requisições HTTP
import "../../componentes/navBar.css";
import logo from "../../assets/favicon.ico";

const NavBar2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteAccount = async () => {
    const firebaseUid = localStorage.getItem("FirebaseId");

    if (!firebaseUid) {
      alert("Usuário não autenticado.");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/delete_empresa/${firebaseUid}`
      );

      if (response.status === 200) {
        alert("Conta deletada com sucesso!");
        localStorage.removeItem("FirebaseId"); // Limpa o localStorage
        navigate("/login"); // Redireciona para a página de login
      }
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      alert("Erro ao deletar conta. Tente novamente.");
    }
  };

  return (
    <nav id="navBar">
      <div className="cabeçalho">
        <div className="img">
          <img src={logo} alt="Logo" className="logoHome" />
        </div>
        <h2>
          <Link to="/home" className="link">
            Freela
          </Link>
        </h2>
      </div>

      <div className="login-register">
        <p>
          <Link to="/CadastrarProjeto" className="link">
            Poste um Projeto
          </Link>
        </p>
        <p>
          <Link to="/listarPropostas" className="link">
            <button className="link-cadastre">Listar propostas</button>
          </Link>
        </p>
        <div className="settings-dropdown">
          <button className="settings-button" onClick={toggleDropdown}>
            <FiSettings size={24} />
          </button>
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/editar-empresa" className="dropdown-link">
                  Editar Empresa
                </Link>
              </li>
              <li>
                <button
                  className="dropdown-link delete-account"
                  onClick={() => setShowConfirmation(true)}
                >
                  Deletar Conta
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {showConfirmation && (
        <div className="confirmation-modal" style={{}}>
          <p>Tem certeza que deseja deletar a sua conta?</p>
          <div>
            <button onClick={handleDeleteAccount}>Sim</button>
            <button onClick={() => setShowConfirmation(false)}>Não</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar2;
