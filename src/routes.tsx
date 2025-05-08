import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Login } from './pages/Login';
import { ResourceList } from './pages/List';
import { ResourceDetail } from './pages/Detail';
import { ProtectedRoute } from './components/protectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: 'login', element: <Login /> },
      { 
        path: 'resources',
        element: <ProtectedRoute><ResourceList /></ProtectedRoute>,
        errorElement: <ErrorBoundary />
      },
      { 
        path: 'resources/:id',
        element: <ProtectedRoute><ResourceDetail /></ProtectedRoute>,
        errorElement: <ErrorBoundary />
      },
      { path: '*', element: <NotFound /> }
    ]
  }
]);