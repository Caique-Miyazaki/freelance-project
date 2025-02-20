import { Link } from "react-router-dom";
import { useState } from "react";
import { FiSettings } from "react-icons/fi"; // Importando o ícone de engrenagem
import "../../componentes/navBar.css";
import logo from "../../assets/favicon.ico";

const NavBar2 = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav id="navBar">
      <div className="cabeçalho">
        <div className="img">
          <img src={logo} alt="Logo" className="logoHome" />
        </div>
        <h2>
          <Link to="/home" className="link">
            Nome do Site
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
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar2;
