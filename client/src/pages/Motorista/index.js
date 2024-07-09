import React, { useState } from "react";
import Menu from "../../components/Menu";
import { styled } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { TextField } from "@mui/material";
import "./styles.css";

const drawerWidth = 240;

const Container = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: 60,
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
}));

export function Motorista() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnh, setCnh] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Menu />
      <Content>
        <form onSubmit={handleSubmit}>
          <h3>Cadastro</h3>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cpf"
              label="CPF"
              name="cpf"
              autoComplete="cpf"
              autoFocus
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="cnh"
              label="CNH"
              name="cnh"
              autoComplete="cnh"
              autoFocus
              value={cnh}
              onChange={(e) => setCnh(e.target.value)}
            />
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Senha"
            name="password"
            autoComplete="password"
            autoFocus
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            label="Confirmar Senha"
            name="confirmPassword"
            autoComplete="confirmPassword"
            autoFocus
            value={confirmPassword}
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Cadastrar
          </button>
        </form>
      </Content>
    </Container>
  );
}
