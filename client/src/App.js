import React from "react";
import { RoutesComponent } from "./routes";
import { useAuth } from "./hooks/useAuth";
import {BrowserRouter,Routes,Route,Switch} from "react-router-dom";
import { Login } from "./pages/login";

export const App = () => {
  const { logged } = useAuth();
  return  (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={logged ? <RoutesComponent /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};
