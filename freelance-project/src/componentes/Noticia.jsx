import React from "react";
import PropTypes from "prop-types"; // Importando PropTypes
import "./Noticia.css";

const Noticia = ({ imagem, texto }) => {
  return (
    <div className="noticia">
      <img src={imagem} alt="Notícia" className="noticia-img" />
      <p className="noticia-texto">{texto}</p>
    </div>
  );
};

// Validação das props
Noticia.propTypes = {
  imagem: PropTypes.string.isRequired, // A prop 'imagem' deve ser uma string e é obrigatória
  texto: PropTypes.string.isRequired, // A prop 'texto' deve ser uma string e é obrigatória
};

export default Noticia;
