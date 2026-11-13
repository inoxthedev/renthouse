import { Outlet } from 'react-router-dom';
import { useInfo } from '../hooks/useInfo';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { info } = useInfo();
  useEffect(() => {
    if (Object.keys(info).length === 0 || info?.role === true) {
      window.location.href = '/forbidden';
      return;
    }
  }, [info]);

  if (Object.keys(info).length === 0 || info?.role === true) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;