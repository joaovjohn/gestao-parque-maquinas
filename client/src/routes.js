import React from "react";
import { useAuth } from "./hooks/useAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Motorista } from "./pages/Motorista";
import { Pessoa } from "./pages/Pessoa";
import { Servico } from "./pages/servicos";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({ children }) => {
  const { logged } = useAuth();
  if (!logged) {
    toast.error("Você precisa estar logado para acessar esta página!");
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const RoutesComponent = () => {
  const { logged } = useAuth();

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={logged ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/motorista"
          element={
            <PrivateRoute>
              <Motorista />
            </PrivateRoute>
          }
        />
        <Route
          path="/servico"
          element={
            <PrivateRoute>
              <Servico />
            </PrivateRoute>
          }
        />
        <Route
          path="/pessoa"
          element={
            <PrivateRoute>
              <Pessoa />
            </PrivateRoute>
          }
        />
        <Route
          path="/pessoa/cadastro"
          element={
            <PrivateRoute>
              <Pessoa />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={<Navigate to={logged ? "/pessoa" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
