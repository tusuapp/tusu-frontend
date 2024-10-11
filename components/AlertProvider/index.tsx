import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

import { selectAlerts } from "../../features/alerts/alertSlice";

interface AlertProviderProps {
  children: React.ReactNode;
}

const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const alerts = useSelector(selectAlerts);

  const { errors, messages, warnings } = alerts;

  useEffect(() => {
    errors.map((error: any) => {
      toast.error(error);
    });

    messages.map((error: any) => {
      toast(error);
    });

    warnings.map((error: any) => {
      toast(error);
    });
  }, [alerts]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ marginTop: "80px" }}
      />
      {children}
    </>
  );
};

export default AlertProvider;
