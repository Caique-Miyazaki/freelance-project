import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import HomePage from "./pages/HomePage.jsx";
import VagasPage from "./pages/VagasPage.jsx";
import Chat from "./componentes/Chat.jsx";
import Join from "./componentes/Join.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SingUpPage from "./componentes/SingUpPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import SignUpCompanyPage from "./componentes/SingUpEmpresa.jsx";
import CadastraProjeto from "./pages/empresa/CadastraProjeto.jsx";
import FreelanceInProjeto from "./pages/empresa/FreelanceInProjeto.jsx";

function Root() {
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/register" element={<RegisterPage />}>
              <Route path="client" element={<SignUpCompanyPage />} />
              <Route
                path="freelance"
                element={<SingUpPage setUser={setUser} />}
              />
            </Route>
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/CadastrarProjeto" element={<CadastraProjeto />} />
            <Route path="/vagas" element={<VagasPage user={user} />} />
            <Route path="/freelance" element={<FreelanceInProjeto />} />
            <Route
              path="/chat/:empresaEmail"
              element={<Chat socket={socket} user={user} />}
            />
            <Route path="/join" element={<Join setSocket={setSocket} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
