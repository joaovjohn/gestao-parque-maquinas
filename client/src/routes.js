import React from "react";
import { useAuth } from "./hooks/useAuth";
import {
 BrowserRouter, Routes,Route ,Navigate
} from "react-router-dom";
import { Motorista } from "./pages/Motorista";
import { Pessoa } from "./pages/Pessoa";
import { Login } from "./pages/login";

const PrivateRoute = ({ children }) => {
  const { logged } = useAuth();

  return logged ? children : <Navigate to="/login" replace />;
};

export const RoutesComponent = () => {
  const { logged } = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={logged ? <Navigate to="/pessoa" replace />: <Login />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/motorista" element={<PrivateRoute><Motorista /></PrivateRoute>} />
        <Route path="/pessoa" element={<PrivateRoute><Pessoa /></PrivateRoute>} />
        <Route path="*" element={<Navigate to={logged ? "/pessoa" : "/login"} replace />} />
      </Routes>
    </BrowserRouter>
  );
};

