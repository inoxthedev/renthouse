import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import GuestRoute from './GuestRoute';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ProtectedRoute from './ProtectedRoute';
import Forbidden from '../pages/Forbidden';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
          {
            path: '/forgot-password',
            element: <ForgotPassword />
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      
    ],
  },
  {
    path: '/forbidden',
    element: <Forbidden />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;