import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/freelanceInProjeto.css";
import { RiMessage2Fill } from "react-icons/ri";

const FreelanceInProjeto = () => {
  const [freelances, setFreelances] = useState([
    {
      name: "caique",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis esse excepturi, consequatur, ut minus eum aliquam tempora accusantium at doloremque provident culpa voluptas aliquid rerum atque, eligendi illo quas error!",
      data: "10/05/2024",
      id: 1,
    },
    {
      name: "guilherme",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis esse excepturi, consequatur, ut minus eum aliquam tempora accusantium at doloremque provident culpa voluptas aliquid rerum atque, eligendi illo quas error!",
      data: "10/05/2024",
      id: 2,
    },
  ]);

  const handleCheckboxChange = (id) => {
    // Remover o card após 3 segundos
    setTimeout(() => {
      setFreelances((prevFreelances) =>
        prevFreelances.filter((freelance) => freelance.id !== id)
      );
    }, 3000); // Esconde o card após 3 segundos
  };

  return (
    <div className="container-card">
      {freelances.map((freelance) => (
        <div key={freelance.id}>
          <div className="card">
            <div className="desc">
              <h2>{freelance.name}</h2>
              <p>{freelance.desc}</p>
            </div>
            <div className="data">
              <data value={freelance.data}>{freelance.data}</data>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id=""
                onChange={() => handleCheckboxChange(freelance.id)}
              />
              <Link to="#">
                <RiMessage2Fill className="btn-chat" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FreelanceInProjeto;
