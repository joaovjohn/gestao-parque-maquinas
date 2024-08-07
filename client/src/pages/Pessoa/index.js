import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { CustomTable } from "../../components/CustomTable";
import { api } from "../../api/api";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form } from "../../components/Form";

const drawerWidth = 240;

const Container = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: 60,
  marginLeft: drawerWidth,
}));

export function Pessoa() {
  const [pessoa, setPessoa] = useState([]);
  const [editing, setEditing] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const columns = [
    { id: "nome", label: "Nome" },
    { id: "cpf", label: "CPF" },
    { id: "email", label: "Email" },
    { id: "data_nasc", type: "date", label: "Data de Nascimento" },
  ];

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };
  const getPessoa = async () => {
    try {
      const res = await api.get("/pessoa");
      setPessoa(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPessoa();
  }, []);

  const handleEdit = (id) => {
    const editData = { ...pessoa?.find((i) => i?.id === Number(id)) };
    setEditing({
      id: editData?.id,
      email: editData?.email,
      nome: editData?.nome,
    });
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("/pessoa/" + id);
      setPessoa(pessoa?.filter((i) => i?.id !== Number(id)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Menu />
      <Content>
        <Grid container spacing={2}>
          <h3>Pessoas</h3>
          <div
            className="row"
            style={{
              width: "100%",
              justifyContent: "flex-end",
              marginBottom: 32,
            }}
          >
            <button
              type="button"
              className="add"
              onClick={() => setIsDrawerOpen(true)}
            >
              Adicionar
            </button>
          </div>

          <CustomTable
            title="Pessoa"
            columns={columns}
            data={pessoa}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </Grid>
      </Content>
      <Form
        isOpen={isDrawerOpen}
        onClose={toggleDrawer(false)}
        keys={[
          { id: "nome", label: "Nome" },
          { id: "cpf", label: "CPF", nonEdit: true },
          { id: "email", label: "Email" },
          {
            id: "data_nasc",
            type: "date",
            label: "Data de Nascimento",
            nonEdit: true,
          },
          { id: "login", label: "Login", nonEdit: true },
          { id: "senha", type: "password", label: "Senha" },
        ]}
        endpoint="/pessoa"
        onCadastroSucesso={async () => {
          try {
            const res = await api.get("/pessoa");
            setPessoa(res.data.data);
          } catch (error) {
            console.error(error);
          }
        }}
        name="pessoa"
        reset={() => setEditing({})}
        editing={editing}
      />
    </Container>
  );
}
