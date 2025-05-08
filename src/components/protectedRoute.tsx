import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/app.store';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" replace />;
}