import { createContext, useState } from 'react';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(false);
  const [option, setOption] = useState({
    message: '',
    type: '',
  });

  const handleShowToast = (message = '', type = 'success') => {
    setToast(true);
    setOption({
      message,
      type, //success || error
    });
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <ToastContext.Provider value={{ handleShowToast }}>
      {children}
      {toast && (
        <div className={`toast toast-top z-1000`}>
          <div className={`alert ${option.type === 'success' ? 'alert-success' : 'alert-error'} shadow-lg text-white`}>
            <span>{option.message}</span>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastProvider };
