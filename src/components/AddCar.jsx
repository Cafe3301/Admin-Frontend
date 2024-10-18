import React, { useState } from "react";
import { addCar } from "../api";

const AddCar = ({ onCarAdded }) => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [username, setUsername] = useState(""); // Novo estado
  const [cpf, setCpf] = useState(""); // Novo estado

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      name,
      model,
      year,
      status: "Aguardando", // status inicial
      username, // Adicionando username
      cpf, // Adicionando cpf
    };

    try {
      await addCar(carData);
      // Limpa os campos do formulário
      setName("");
      setModel("");
      setYear("");
      setUsername(""); // Limpa o campo username
      setCpf(""); // Limpa o campo cpf
      // Chama a função para atualizar a lista de carros
      if (onCarAdded) {
        onCarAdded();
      }
    } catch (error) {
      console.error("Failed to add car:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
      />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;