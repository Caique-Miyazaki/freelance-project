import React from "react";

import "./Styles/home.css";
import MiniNavBar from "../componentes/MiniNavBar"; // Importando a MiniNavBar
import Noticia from "../componentes/Noticia"; // Importando o componente de Notícias

const lorem =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ea velit perferendis. Aspernatur tempora asperiores recusandae doloribus, doloremque, aperiam autem numquam dolore porro est quam mollitia voluptatum vitae incidunt totam.";

const noticiasData = [
  {
    id: 1,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbvsqJF4bksE6L9c65NNWpPho2_tyW-5scw&s",
    texto: `Notícia 1 - Detalhes sobre o evento X: ${lorem}`,
  },
  {
    id: 2,
    imagem: "https://tm.ibxk.com.br/2024/10/08/08180553705330.jpg?ims=750x",
    texto: `Notícia 2 - Detalhes sobre o evento X: ${lorem}`,
  },
  {
    id: 3,
    imagem: "https://tm.ibxk.com.br/2024/11/11/11145541479767.jpg?ims=1280x480",
    texto: `Notícia 3 - Detalhes sobre o evento X: ${lorem}`,
  },
  {
    id: 1,
    imagem:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbvsqJF4bksE6L9c65NNWpPho2_tyW-5scw&s",
    texto: `Notícia 1 - Detalhes sobre o evento X: ${lorem}`,
  },
  {
    id: 2,
    imagem: "https://tm.ibxk.com.br/2024/10/08/08180553705330.jpg?ims=750x",
    texto: `Notícia 2 - Detalhes sobre o evento X: ${lorem}`,
  },
  {
    id: 3,
    imagem: "https://tm.ibxk.com.br/2024/11/11/11145541479767.jpg?ims=1280x480",
    texto: `Notícia 3 - Detalhes sobre o evento X: ${lorem}`,
  },
];

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="content-noticias">
        <h1>Noticias</h1>
        <article className="noticias">
          {noticiasData.map((noticia) => (
            <div key={noticia.id} className="noticia">
              <img
                src={noticia.imagem}
                alt="Imagem da notícia"
                className="noticia-img"
              />
              <div className="noticia-texto">{noticia.texto}</div>
            </div>
          ))}
        </article>
      </div>
    </div>
  );
};

export default HomePage;
