import React, { createContext, useState } from "react";
import { api } from "../api/api";
import { Navigate } from "react-router-dom";
export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const isLogged = localStorage.getItem("@token:user");
        return JSON.parse(isLogged);
      })

  const [logged, setLogged] = useState(() => {
    const isLogged = localStorage.getItem("@token:user");
    return !!isLogged;
  });

  const signIn = async (login, senha) => {
    try {
      const response = await api.post('/login', {
        login,
        senha,
      });
      const { token } = await response.data;
  
      localStorage.setItem("@token:user", `"${token}"`); 
      setLogged(true);
      Navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("@token:user");
    setLogged(false);
    setUser(null);
    Navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ logged,user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};