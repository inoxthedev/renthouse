import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import Loading from '../components/common/Loading';

const RootLayout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Header />
      <Outlet />
      <Footer />
    </Suspense>
  );
};

export default RootLayout;