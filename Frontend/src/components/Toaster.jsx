import React, { createContext, useContext, useState } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

const ToastContext = createContext();

export const ToasterProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const toast = (message, type = "info", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed top-5 right-5 space-y-2 z-50">
        {toasts.map(({ id, message, type }) => {
          let icon = <Info className="w-5 h-5" />;
          let bg = "bg-gray-200 text-gray-900";

          if (type === "success") {
            icon = <CheckCircle className="w-5 h-5" />;
            bg = "bg-green-100 text-green-800";
          } else if (type === "error") {
            icon = <AlertCircle className="w-5 h-5" />;
            bg = "bg-red-100 text-red-800";
          }

          return (
            <div
              key={id}
              className={`flex items-center space-x-2 p-3 rounded shadow ${bg} animate-slide-in`}
            >
              {icon}
              <span className="flex-1">{message}</span>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== id))}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

// Hook to use the toaster
export const useToast = () => useContext(ToastContext);