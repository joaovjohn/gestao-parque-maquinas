import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { CustomTable } from "../../components/CustomTable";
import { api } from "../../api/api";
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
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

export function Motorista() {
  const [motoristas, setMotoristas] = useState([]);
  const [servico, setServico] = useState([]);
  const [pessoa, setPessoa] = useState([]);
  const [aguardando, setAguardando] = useState([]);
  const [finalizados, setFinalizados] = useState([]);

  const [editing, setEditing] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const columns = [
    { id: "nome", label: "Nome" },
    { id: "categoria_cnh", label: "CNH" },
    { id: "status", label: "Status" },
  ];

  useEffect(() => {
    const getServicos = async () => {
      try {
        const res = await api.get("/motoristas-servico");
        if (res.data.data) setServico(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getAguardando = async () => {
      try {
        const res = await api.get("/motoristas-aguardando");
        if (res.data.data) setAguardando(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getFinalizados = async () => {
      try {
        const res = await api.get("/motoristas-disponiveis");
        if (res.data.data) setFinalizados(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getMotoristas = async () => {
      try {
        const res = await api.get("/motorista");
        if (res.data.data) setMotoristas(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    const getPessoa = async () => {
      try {
        const res = await api.get("/pessoa-criar");
        setPessoa(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPessoa();
    getMotoristas();

    getAguardando();
    getFinalizados();
    getServicos();
  }, []);

  const handleEdit = (id) => {
    const editData = { ...motoristas?.find((i) => i?.id === Number(id)) };
    setEditing({
      id: editData?.id,
      categoria_cnh: editData?.categoria_cnh,
      num_cnh: editData?.num_cnh,
    });
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("/motorista/" + id);
      setMotoristas(motoristas?.filter((i) => i?.id !== Number(id)));
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <Container>
      <Menu />
      <Content>
        <Grid container spacing={2}>
          <h3>Motoristas</h3>
          <div className="card" style={{ marginBottom: 32 }}>
            <div className="row">
              <div className="green-icon">
                <img src="/Line 1.svg" alt="" />
              </div>
              <div className="card-column">
                <span>Disponíveis</span>
                <h4>{finalizados?.length}</h4>
              </div>
            </div>
            <div className="row">
              <div className="green-icon">
                <img src="/profile-tick.svg" alt="" />
              </div>
              <div className="card-column">
                <span>Aguardando</span>
                <h4>{aguardando?.length}</h4>
              </div>
            </div>
            <div className="row">
              <div className="green-icon">
                <img src="/package_car.svg" alt="" />
              </div>
              <div className="card-column">
                <span>Em Serviço</span>
                <h4>{servico?.length}</h4>
              </div>
            </div>
          </div>
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
            title="Motoristas"
            columns={columns}
            data={motoristas}
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
        keys={[
          {
            id: "pessoa_id",
            label: "Pessoa",
            options: pessoa?.map((i) => ({ label: i?.nome, value: i?.id })),
            nonEdit: true,
          },
          { id: "num_cnh", label: "CNH" },
          {
            id: "categoria_cnh",
            label: "Tipo CNH",
            options: [
              { label: "A", value: "A" },
              { label: "B", value: "B" },
              { label: "C", value: "C" },
              { label: "D", value: "D" },
              { label: "E", value: "E" },
              { label: "AB", value: "AB" },
              { label: "AC", value: "AC" },
              { label: "AD", value: "AD" },
              { label: "AE", value: "AE" },
            ],
          },
        ]}
        endpoint="/motorista"
        onCadastroSucesso={async () => {
          try {
            const res = await api.get("/motorista");
            if (res.data.data) setMotoristas(res.data.data);
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
