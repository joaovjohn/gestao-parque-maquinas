import React from "react";
import { useAuth } from "./hooks/useAuth";
import {
 BrowserRouter, Routes,Route ,Navigate
} from "react-router-dom";
import { Motorista } from "./pages/Motorista";
import { Pessoa } from "./pages/Pessoa";
import { Login } from "./pages/login";

export const RoutesComponent = () => {
  const { logged } = useAuth();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={logged ? <Navigate to="/" replace />: <Login />} />
        <Route path="/motorista" element={<Motorista />} />
        <Route path="/pessoa" element={<Pessoa />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};