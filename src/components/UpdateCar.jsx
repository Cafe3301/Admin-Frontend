import React, { useState } from 'react';
import { updateCar } from '../api';

const UpdateCar = ({ car, onUpdate }) => {
    const [name, setName] = useState(car.name);
    const [status, setStatus] = useState(car.status);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedCar = await updateCar(car._id, { name, status });
            console.log('Carro atualizado:', updatedCar);
            onUpdate(updatedCar); 
        } catch (error) {
            setError('Erro ao atualizar carro');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome do carro"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Status do carro"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            <button type="submit">Atualizar Carro</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default UpdateCar;
