import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useInfo } from '../hooks/useInfo';

const GuestRoute = () => {
  const { info } = useInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (info._id) {
      navigate('/forbidden');
    }
  }, [info, navigate]);

  return <Outlet />;
};

export default GuestRoute;