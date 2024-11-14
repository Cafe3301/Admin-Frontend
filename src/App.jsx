import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCar from './components/AddCar';
import CarList from './components/CarList';
import Login from './components/Login'; 
import './index.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} /> {/* Rota para a página de login */}
                <Route path="/home" element={
                    <div>
                        <h1>Lava Jato</h1>
                        <AddCar />
                        <h2>Lista de Carros</h2>
                        <CarList />
                    </div>
                } />
            </Routes>
        </Router>
    );
};

export default App;
