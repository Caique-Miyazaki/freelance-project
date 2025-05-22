import { Link } from "react-router-dom";
import "./navBar.css";
import logo from "../assets/favicon.ico";

const NavBar = () => {
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
          <Link to="/login" className="link">
            Faça o login
          </Link>
        </p>
        <p>
          <Link to="/register" className="link">
            <button className="link-cadastre">Cadastre-se</button>
          </Link>
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
