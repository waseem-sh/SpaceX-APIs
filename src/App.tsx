import { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { useAuthStore } from './store/app.store';
import './App.scss';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Outlet /> 
    </MantineProvider>
  );
}