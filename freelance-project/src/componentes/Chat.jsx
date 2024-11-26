import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Chat = ({ socket, user }) => {
  const { empresaEmail } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (socket) {
      const handleReceiveMessage = (message) => {
        setMessages((prev) => [...prev, message]);
      };

      socket.on("receive_message", handleReceiveMessage);

      // Limpeza do evento ao desmontar o componente
      return () => {
        socket.off("receive_message", handleReceiveMessage);
      };
    }
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        sender: user.email,
        recipient: empresaEmail,
        text: newMessage,
        userType: user.userType, // Envia o tipo de usuário junto com a mensagem
      };
      socket.emit("send_message", messageData);
      setMessages((prev) => [...prev, messageData]);
      setNewMessage("");
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <h2>Chat com {empresaEmail}</h2>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === user.email ? "sent" : "received"}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Digite sua mensagem..."
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
};

Chat.propTypes = {
  socket: PropTypes.object,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    userType: PropTypes.string.isRequired, // Validação do tipo de usuário
  }).isRequired,
};

export default Chat;
