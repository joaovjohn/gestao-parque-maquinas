import React, { useState, useEffect } from "react";
import { Drawer, Button, TextField, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { api } from "../../api/api";
import "./styles.css";
export function Form({
  isOpen,
  keys,
  editing,
  onClose,
  onCadastroSucesso,
  name,
  endpoint,
  reset,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (editing) setFormData(editing);
  }, [editing]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    onClose();
    if (reset) reset();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editing?.id) {
        const data = { ...formData };
        if (data.id) delete data.id;
        if (data.status) delete data.status;
        if (data.status_id) delete data.status_id;
        if (data.marca) delete data.marca;
        if (data.cnh) delete data.cnh;

        await api.put(`${endpoint}/${editing?.id}`, data);
      } else await api.post(endpoint, formData);
      if (onCadastroSucesso) onCadastroSucesso();
      handleClose();
      toast.success("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao cadastrar. Verifique os campos e tente novamente.");
    }
  };

  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
        <Box sx={{ width: 350, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {editing?.id ? "Editar" : "Cadastrar"} {name}
          </Typography>
          <form onSubmit={handleSubmit}>
            {keys?.map((key) => {
              if (key?.nonEdit && editing?.id) return <></>;
              if (key?.options && key?.options?.length > 0)
                return (
                  <FormControl
                    key={key?.label}
                    style={{ width: "100%" }}
                    margin="normal"
                  >
                    <InputLabel id={key?.label}>{key?.label}</InputLabel>
                    <Select
                      style={{ width: "100%" }}
                      value={String(formData?.[key?.id])}
                      label={key?.label}
                      id={key?.label}
                      name={key?.id}
                      onChange={handleInputChange}
                    >
                      {key?.options?.map((option) => (
                        <MenuItem value={option?.value}>
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                );
              return (
                <TextField
                  className={formData?.[key?.id] ? "" : "white-font"}
                  margin="normal"
                  fullWidth
                  label={key?.label}
                  key={key?.label}
                  name={key?.id}
                  type={key?.type ?? "text"}
                  value={formData?.[key?.id] ?? undefined}
                  onChange={handleInputChange}
                />
              );
            })}

            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={handleClose}>
              Fechar
            </Button>
          </form>
        </Box>
      </Drawer>
    </>
  );
}
