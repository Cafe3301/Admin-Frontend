import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Verifica se o token está armazenado
        setIsAuthenticated(!!token);
    }, []);

    return { isAuthenticated };
};

export default useAuth;
