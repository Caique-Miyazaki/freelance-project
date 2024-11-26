import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./componentes/NavBar";
import Footer from "./componentes/Footer";
import "./App.css";
import NavBar2 from "./pages/empresa/NavBar2";
import NavBarFree from "./componentes/freelance/NavBarFre";

function App() {
  const location = useLocation(); // Obtém a rota atual

  const showNav2 =
    location.pathname !== "/register" &&
    location.pathname !== "/register/freelance" &&
    location.pathname !== "/login" &&
    location.pathname !== "/register/client" &&
    location.pathname !== "/vagas" &&
    location.pathname !== "/freelance" &&
    location.pathname !== "/home";

  // Condição para esconder a NavBar nas rotas específicas
  const showNavBar =
    location.pathname !== "/register" &&
    location.pathname !== "/register/freelance" &&
    location.pathname !== "/login" &&
    location.pathname !== "/register/client";

  const showNavBar3 =
    location.pathname !== "/register" &&
    location.pathname !== "/register/freelance" &&
    location.pathname !== "/login" &&
    location.pathname !== "/register/client" &&
    location.pathname !== "/register" &&
    location.pathname !== "/register/freelance" &&
    location.pathname !== "/login" &&
    location.pathname !== "/register/client" &&
    location.pathname !== "/freelance" &&
    location.pathname !== "/home" &&
    location.pathname !== "/CadastrarProjeto" &&
    location.pathname !== "/listarPropostas";

  return (
    <div className="app">
      {showNavBar && <NavBar />}

      {showNav2 && <NavBar2 />}

      {showNavBar3 && <NavBarFree />}

      {/* Renderiza a NavBar apenas nas rotas especificadas */}
      <Outlet />
      {/* Renderiza o Footer apenas se a rota atual for "/home" */}
      {location.pathname === "/home" && <Footer />}
    </div>
  );
}

export default App;
