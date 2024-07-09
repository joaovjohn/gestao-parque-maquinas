import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/authContext"; // Ajuste o caminho conforme necessário
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { TextField } from "@mui/material";
import Logo from "../../assets/logo.gif";

export function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(login, password, navigate);
    } catch (error) {
      console.log("Erro:", error);
    }
  };

  return (
    <div className="container">
      <img src="" alt="" className="" />
      <form onSubmit={handleSubmit} className="form-card">
        <header>
          <img
            src={Logo}
            alt="Logo da Prefeitura de São José do Inhacora/RS."
            className="Logo"
          />
          <h1>Gestão de Parque de Máquinas</h1>
        </header>

        <div className="form-group">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Usuário"
            name="login"
            autoComplete="login"
            autoFocus
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="form-group">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </form>
    </div>
  );
}
