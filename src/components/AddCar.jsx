import React, { useState } from "react";
import { addCar } from "../api";

const AddCar = ({ onCarAdded }) => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const userName = localStorage.getItem('userName'); // Captura o nome do usuário do localStorage
  const userCPF = localStorage.getItem('userCPF'); // Captura o CPF do usuário do localStorage

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      name,
      model,
      year,
      status: "Aguardando", // status inicial
      username: userName, // Adicionando username
      cpf: userCPF, // Adicionando cpf
    };

    try {
      await addCar(carData);
      // Limpa os campos do formulário
      setName("");
      setModel("");
      setYear("");
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
      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;
