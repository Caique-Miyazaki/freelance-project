import { Link, Outlet, useMatch } from "react-router-dom";
import "./Styles/registerPage.css";
import empresa from "../assets/empresa.png";
import freelancer from "../assets/freelance.png";

function Register() {
  const isRegisterPath = useMatch("/register");

  return (
    <div className="container">
      {isRegisterPath && (
        <>
          <h1>Register</h1>
          <div className="register">
            <div className="freelance-empresa">
              <h2>freelancer</h2>
              <Link to="freelance">
                <button className="btn">
                  <img
                    className="img-freelance"
                    src={freelancer}
                    alt="Freelancer"
                  />
                </button>
              </Link>
            </div>
            <div className="freelance-empresa">
              <h2>empresa</h2>
              <Link to="client">
                <button className="btn">
                  <img
                    className="img-freelance-empresa"
                    src={empresa}
                    alt="Empresa"
                  />
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Register;
