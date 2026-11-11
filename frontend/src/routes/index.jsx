import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import AuthLayout from '../layouts/AuthLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

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
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

export default router;
