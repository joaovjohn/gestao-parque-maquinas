import React, { createContext, useState } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [permission, setPermission] = useState(() => {
    const perm = localStorage.getItem("@permission");
    return JSON.parse(perm);
  });

  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem("@token");
    api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      isLogged
    )}`;
    return !!isLogged;
  });

  const signIn = async (login, senha, navegate) => {
    try {
      const response = await api.post("/login", {
        login,
        senha,
      });
      const { token, user } = await response.data;

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("@token", `"${token}"`);
      localStorage.setItem("@permission", JSON.stringify(user));
      setLogged(true);
      setPermission(user);
      toast.success("Login bem-sucedido!"); // Toast de sucesso
      navegate("/");
    } catch (error) {
      console.error(error);
      toast.error("Falha no login. Verifique suas credenciais."); // Toast de erro
    }
  };

  const signOut = (navigate) => {
    localStorage.removeItem("@token");
    localStorage.removeItem("@permission");
    setLogged(false);
    setPermission(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ logged, permission, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
