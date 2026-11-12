import { RouterProvider } from 'react-router-dom';
import router from './routes/index';
import { ToastProvider } from './contexts/ToastContext';
import { InfoProvider } from './contexts/InfoContext';

function App() {
  return (
    <ToastProvider>
      <InfoProvider>
        <RouterProvider router={router} />
      </InfoProvider>
    </ToastProvider>
  );
}

export default App;
