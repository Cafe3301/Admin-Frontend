import React, { useEffect, useState } from "react";
import { fetchCars, updateCarStatus, deleteCar, fetchAppointments, deleteAppointment } from "../api";
import './CarList.css';

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false); 

  const getCars = async () => {
    try {
      const fetchedCars = await fetchCars();
      setCars(fetchedCars);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  const getAppointments = async () => {
    try {
      const fetchedAppointments = await fetchAppointments();
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    if (showAppointments) {
      getAppointments(); 
    }
  }, [showAppointments]);

  const handleStatusChange = async (carId, newStatus) => {
    try {
      const updatedCar = await updateCarStatus(carId, newStatus);
      setCars((prevCars) =>
        prevCars.map((car) => (car._id === updatedCar._id ? updatedCar : car))
      );
    } catch (error) {
      console.error("Failed to update car status:", error);
    }
  };

  const handleDeleteCar = async (carId) => {
    try {
      await deleteCar(carId);
      setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments((prevAppointments) => 
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  const toggleAppointments = () => {
    setShowAppointments(!showAppointments);
  };

  return (
    <div className="car-list-container">
      <h2>Administração de Carros</h2>
      <button onClick={toggleAppointments}>
        {showAppointments ? "Voltar à lista de carros" : "Ver Agendamentos"}
      </button>

      {showAppointments ? (
        <div className="appointments-section">
          <h2>Lista de Agendamentos</h2>
          <div className="appointments-list">
            {appointments.length === 0 ? (
              <p>Não há agendamentos.</p>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment._id} className="appointment-item">
                  <p>Usuário: {appointment.userName}</p>
                  <p>CPF: {appointment.userCPF}</p>
                  <p>Telefone: {appointment.userPhone}</p> {/* Adicionado */}
                  <p>Email: {appointment.userEmail}</p> {/* Adicionado */}
                  <p>Carro ID: {appointment.carId ? appointment.carId.toString() : "N/A"}</p>
                  <p>Data do Agendamento: {new Date(appointment.appointmentDate).toLocaleString()}</p>
                  <p>Status: {appointment.status}</p>
                  <button onClick={() => handleDeleteAppointment(appointment._id)}>Delete</button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="car-list">
          {cars.map((car) => (
            <div key={car._id} className="car-item">
              <div className="car-details">
                <p>Nome do Usuário: {car.name}</p>
                <p>Modelo do carro: {car.model}</p>
                <p>Ano do carro: {car.year}</p>
                <p>Status da lavagem: {car.status}</p>
              </div>
              <select
                value={car.status}
                onChange={(e) => handleStatusChange(car._id, e.target.value)}
              >
                <option value="Aguardando">Aguardando</option>
                <option value="Lavando">Lavando</option>
                <option value="Pronto">Pronto</option>
              </select>
              <button onClick={() => handleDeleteCar(car._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
