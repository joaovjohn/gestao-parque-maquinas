import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { CustomTable } from "../../components/CustomTable";
import { api } from "../../api/api";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import { Form } from "../../components/Form";

const drawerWidth = 240;

const Container = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Content = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: 60,
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
}));

export function Localidade() {
  const [localidade, setLocalidade] = useState([]);

  const [editing, setEditing] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const columns = [
    { id: "nome", label: "Bairro" },
    { id: "cidade", label: "Cidade" },
    { id: "uf", label: "Estado" },
    { id: "pais", label: "País" },
  ];

  useEffect(() => {
    const getLocalidades = async () => {
      try {
        const res = await api.get("/localidade");
        if (res.data.data) setLocalidade(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getLocalidades();
  }, []);

  const handleEdit = (id) => {
    setEditing(localidade?.find((i) => i?.id === Number(id)));
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("/localidade/" + id);
      setLocalidade(localidade?.filter((i) => i?.id !== Number(id)));
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <Container>
      <Menu />
      <Content>
        <Grid container spacing={2}>
          <h3>Localidades</h3>
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
            title="Localidades"
            columns={columns}
            data={localidade}
            style={{
              overflow: "hidden",
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Grid>
      </Content>
      <Form
        isOpen={isDrawerOpen}
        onClose={toggleDrawer(false)}
        keys={columns}
        endpoint="/localidade"
        onCadastroSucesso={async () => {
          try {
            const res = await api.get("/localidade");
            if (res.data.data) setLocalidade(res.data.data);
          } catch (error) {
            console.error(error);
          }
        }}
        reset={() => setEditing({})}
        name="motorista"
        editing={editing}
      />
    </Container>
  );
}
