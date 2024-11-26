import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import PropTypes from "prop-types"; // Importe o prop-types

export default function Join({ setSocket }) {
  // Recebe setSocket via props
  const inputRef = useRef(null);
  const navigate = useNavigate();

  async function irParaChat() {
    const username = inputRef.current.value;

    if (username.trim()) {
      const socket = await io.connect("http://localhost:3001");
      socket.emit("set_username", username);
      setSocket(socket); // Armazena o socket no estado global
      navigate("/chat");
    }
  }

  return (
    <div>
      <h1>Join</h1>
      <input type="text" placeholder="Nome de usuário" ref={inputRef} />
      <button id="entrar" onClick={irParaChat}>
        Entrar
      </button>
    </div>
  );
}

// Validação de props
Join.propTypes = {
  setSocket: PropTypes.func.isRequired, // Define que 'setSocket' é uma função e obrigatória
};
