import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Supondo que você tenha um hook de autenticação

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Verifique se o usuário está autenticado

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
