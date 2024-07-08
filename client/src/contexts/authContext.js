import React, { createContext, useState } from "react";
import { api } from "../api/api";
import { toast } from 'react-toastify';

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

  const signIn = async (login, senha,navegate) => {
    try {
      const response = await api.post('/login', {
        login,
        senha,
      });
      const { token } = await response.data;
  
      localStorage.setItem("@token:user", `"${token}"`); 
      setLogged(true);
      toast.success('Login bem-sucedido!'); // Toast de sucesso
      navegate('/');
    } catch (error) {
      console.error(error);
      toast.error('Falha no login. Verifique suas credenciais.'); // Toast de erro
    }
  };

  const signOut = (navigate) => {
    localStorage.removeItem("@token:user");
    setLogged(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ logged,user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};