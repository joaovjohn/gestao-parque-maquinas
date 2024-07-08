import React, { createContext, useState } from "react";
import { api } from "../api/api";
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

  const signIn = async (login, password) => {
    try {
      const response = await api.post('/api/login', {
        login,
        password,
      });
      console.log(response);
  
      if (!response.ok) {
        throw new Error('Falha na autenticação');
      }
  
      const { token } = await response.json();
  
      localStorage.setItem("@token:user", token); 
      setLogged(true);
      setUser(user); 
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    localStorage.removeItem("@token:user");
    setLogged(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ logged,user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};