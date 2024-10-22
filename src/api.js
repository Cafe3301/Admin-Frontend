// API.js

const BASE_URL = (`${import.meta.env.VITE_API_URL}/cars`)
const APPOINTMENTS_URL = (`${import.meta.env.VITE_API_URL}/appointments`)

// Função para buscar a lista de carros
export const fetchCars = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch cars");
  return await response.json();
};

// Função para adicionar um carro
export const addCar = async (carData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });

  if (!response.ok) throw new Error("Failed to add car");
  return await response.json();
};

// Função para atualizar o status de um carro
export const updateCarStatus = async (carId, newStatus) => {
  const response = await fetch(`${BASE_URL}/${carId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) throw new Error("Failed to update car status");
  return await response.json();
};

// Função para deletar um carro
export const deleteCar = async (carId) => {
  const response = await fetch(`${BASE_URL}/${carId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete car");
};

// Função para buscar a lista de agendamentos
export const fetchAppointments = async () => {
  const response = await fetch(APPOINTMENTS_URL);
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return await response.json();
};

// Função para deletar um agendamento
export const deleteAppointment = async (appointmentId) => {
  const response = await fetch(`${APPOINTMENTS_URL}/${appointmentId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete appointment");
};
