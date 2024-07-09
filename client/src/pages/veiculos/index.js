import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { CustomTable } from "../../components/CustomTable";
import { api } from "../../api/api";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form } from "../../components/Form";
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
}));

export function Veiculo() {
  const [veiculo, setVeiculo] = useState([]);
  const [marca, setMarca] = useState([]);
  const [editing, setEditing] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const columns = [
    { id: "nome", label: "Nome" },
    { id: "ano_fabricacao", label: "Ano" },
    { id: "placa", label: "Placa" },
    { id: "status", label: "Status" },
  ];

  useEffect(() => {
    const getVeiculos = async () => {
      try {
        const res = await api.get("/veiculo");
        if (res.data.data) setVeiculo(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getMarcas = async () => {
      try {
        const res = await api.get("/marca");
        if (res.data.data) setMarca(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getVeiculos();
    getMarcas();
  }, []);

  const handleEdit = (id) => {
    setEditing(veiculo?.find((i) => i?.id === Number(id)));
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("/veiculo/" + id);
      setVeiculo(veiculo?.filter((i) => i?.id !== Number(id)));
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <Container>
      <Menu />
      <Content>
        <Grid container spacing={2}>
          <h3>Veículos</h3>
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
            title="Veículos"
            columns={columns}
            data={veiculo}
            style={{
              overflow: "hidden",
            }}
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
          {
            id: "ano_fabricacao",
            label: "Ano",
          },
          {
            id: "categoria",
            label: "Categoria",
          },
          { id: "placa", label: "Placa" },
          {
            id: "id_marca",
            label: "Marca",
            options: marca?.map((i) => ({ value: i?.id, label: i?.nome })),
          },
        ]}
        endpoint="/veiculo"
        onCadastroSucesso={async () => {
          try {
            const res = await api.get("/veiculo");
            if (res.data.data) setVeiculo(res.data.data);
          } catch (error) {
            console.error(error);
          }
        }}
        name="veiculo"
        reset={() => setEditing({})}
        editing={editing}
      />
    </Container>
  );
}
