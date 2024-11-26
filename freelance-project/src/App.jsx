import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./componentes/NavBar";
import Footer from "./componentes/Footer";
import "./App.css";

function App() {
  const location = useLocation(); // Obtém a rota atual

  // Condição para esconder a NavBar nas rotas específicas
  const showNavBar =
    location.pathname !== "/register" &&
    location.pathname !== "/register/freelance" &&
    location.pathname !== "/login" &&
    location.pathname !== "/register/client";

  return (
    <div className="app">
      {showNavBar && <NavBar />}

      {/* Renderiza a NavBar apenas nas rotas especificadas */}
      <Outlet />
      {/* Renderiza o Footer apenas se a rota atual for "/home" */}
      {location.pathname === "/home" && <Footer />}
    </div>
  );
}

export default App;
