import React, { useState } from "react";
import { Drawer, Button, TextField, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import { api } from "../../../api/api";

export function PessoaCadastro({ isOpen, onClose, onCadastroSucesso }) {
  const [formData, setFormData] = useState({
    cpf: "",
    data_nasc: "",
    email: "",
    nome: "",
    senha: "",
    login: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(
        "/pessoa",
        {
          cpf: formData.cpf,
          data_nasc: formData.data_nasc,
          email: formData.email,
          nome: formData.nome,
          login: formData.login,
          senha: formData.senha,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage
              .getItem("@token:user")
              .replace(/['"]+/g, "")}`,
          },
        }
      );
      console.log(response.data);
      onCadastroSucesso();
      onClose();
      toast.success("Pessoa cadastrada com sucesso!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "Erro ao cadastrar pessoa. Verifique os campos e tente novamente."
      );
    }
  };

  return (
    <>
      <Drawer anchor="right" open={isOpen} v={onClose}>
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Cadastrar Pessoa
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Data de Nascimento"
              name="data_nasc"
              type="date"
              value={formData.data_nasc}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Login"
              name="login"
              value={formData.login}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Senha"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleInputChange}
            />
            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={onClose}>
              Fechar
            </Button>
          </form>
        </Box>
      </Drawer>
    </>
  );
}
