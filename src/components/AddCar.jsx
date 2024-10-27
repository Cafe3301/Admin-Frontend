import React, { useState } from "react";
import { addCar } from "../api";

const AddCar = ({ onCarAdded }) => {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem('userName') || ""); // Usar estado para o username
  const [userCPF, setUserCPF] = useState(localStorage.getItem('userCPF') || ""); // Usar estado para o CPF

  const handleSubmit = async (e) => {
    e.preventDefault();

    const carData = {
      name,
      model,
      year,
      status: "Aguardando", 
      username: userName,
      cpf: userCPF, 
    };

    try {
      await addCar(carData);
      setName("");
      setModel("");
      setYear("");
      setUserName(localStorage.getItem('userName') || ""); 
      setUserCPF(localStorage.getItem('userCPF') || "");
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
        placeholder="CPF"
        value={userCPF}
        onChange={(e) => setUserCPF(e.target.value)} 
        required
      />
      <input
        type="text"
        placeholder="UserName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)} 
        required
      />
      <button type="submit">Add Car</button>
    </form>
  );
};

export default AddCar;
