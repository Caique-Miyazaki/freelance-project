import { Link } from "react-router-dom";
import "../../componentes/navBar.css";
import logo from "../../assets/favicon.ico";

const NavBar2 = () => {
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
      </div>
    </nav>
  );
};

export default NavBar2;
