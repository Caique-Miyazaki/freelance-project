import { useState } from "react";

const PostVaga = () => {
  const [desc, setDesc] = useState(null);
  const [price, setPrice] = useState(null);
  const [title, setTitle] = useState(null);

  const Envia = async (e) => {
    e.preventDefault();

    const formData = {
      name: title, // Correspondente ao 'name'
      minDeadline: "2024-12-01", // Use valores de entrada ou parâmetros adequados
      maxDeadline: "2024-12-31", // Use valores de entrada ou parâmetros adequados
      value: price, // Correspondente ao 'value'
    };

    try {
      const response = await fetch("http://localhost:5000/register_project", {
        // Altere para a URL correta
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Projeto registrado com sucesso");
      } else {
        console.log("Erro ao registrar projeto");
      }
    } catch (e) {
      console.log("Erro:", e.message);
    }
  };

  return (
    <div>
      <form onSubmit={Envia} action="">
        <input
          type="text"
          name=""
          id="title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label htmlFor="">Preço:</label>
        <input
          type="number"
          name=""
          id="price"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <textarea
          name=""
          id="desc"
          placeholder="Descreva o projeto"
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default PostVaga;
