import { Link } from "react-router-dom";
import "../../componentes/navBar.css";
import logo from "../../assets/favicon.ico";

const NavBarFree = () => {
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
          <Link to="/vagas" className="link">
            Listar vagas
          </Link>
        </p>
      </div>
      <div >
        <p>
          <Link to="/empresas" className="link">
            Listar empresas
          </Link>
        </p>
      </div>
    </nav>
  );
};

export default NavBarFree;
