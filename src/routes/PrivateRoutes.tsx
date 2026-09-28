import { useAuth } from '../context/useAuth'; 
import { Outlet, Navigate } from 'react-router';

const PrivateRoutes = () => {
  const { authState, loading } = useAuth();
  
  if (loading) {
    return <div>Carregando usuário...</div>; 
  }
 
  if (!authState) {
    return <Navigate to="/login" replace />; 
  }

  return <Outlet />;
};

export default PrivateRoutes;