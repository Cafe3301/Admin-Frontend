const BASE_URL = `${import.meta.env.VITE_API_URL}/cars`;
const APPOINTMENTS_URL = `${import.meta.env.VITE_API_URL}/appointments`;

export const fetchCars = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Failed to fetch cars");
  return await response.json();
};

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

export const deleteCar = async (carId) => {
  const response = await fetch(`${BASE_URL}/${carId}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Failed to delete car");
};

export const fetchAppointments = async () => {
  const response = await fetch(APPOINTMENTS_URL);
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return await response.json();
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await fetch(`${APPOINTMENTS_URL}/${appointmentId}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Falha ao excluir o agendamento.');
    return response;
  } catch (error) {
    console.error("Erro ao excluir o agendamento:", error);
    throw new Error("Erro na requisição de exclusão.");
  }
};
