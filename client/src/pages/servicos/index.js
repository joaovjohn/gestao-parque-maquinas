import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { CustomTable } from "../../components/CustomTable";
import { api } from "../../api/api";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Form } from "../../components/Form";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DoneIcon from "@mui/icons-material/Done";
import { useAuth } from "../../hooks/useAuth";
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

export function Servico() {
  const [servico, setServico] = useState([]);
  const { permission } = useAuth();
  const [dataServico, setDataServico] = useState([]);
  const [aguardando, setAguardando] = useState([]);
  const [finalizados, setFinalizados] = useState([]);
  const [localidade, setLocalidade] = useState([]);
  const [veiculo, setVeiculo] = useState([]);
  const [editing, setEditing] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [motoristas, setMotoristas] = useState([]);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const columns = [
    { id: "localidade", label: "Localidade" },
    { id: "motorista", label: "Motorista" },
    { id: "dt_inicio", type: "date", label: "Inicío" },
    { id: "placa", label: "Placa" },
    { id: "status", label: "Status" },
  ];

  useEffect(() => {
    const getServicos = async () => {
      try {
        const res = await api.get("/servico-andamento");
        if (res.data) setServico(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getDataServicos = async () => {
      try {
        const res = await api.get("/servico");
        if (res.data.data) setDataServico(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getAguardando = async () => {
      try {
        const res = await api.get("/servico-aguardando");
        if (res.data.data) setAguardando(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getFinalizados = async () => {
      try {
        const res = await api.get("/servico-finalizados-ontem");
        if (res.data.data) setFinalizados(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    const getLocalidades = async () => {
      try {
        const res = await api.get("/localidade");
        if (res.data.data) setLocalidade(res.data.data);
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

    const getVeiculos = async () => {
      try {
        const res = await api.get("/veiculo");
        if (res.data.data) setVeiculo(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getVeiculos();

    getMotoristas();

    getLocalidades();
    getDataServicos();
    getAguardando();
    getFinalizados();
    getServicos();
  }, []);

  const handleEdit = (id) => {
    setEditing(dataServico?.find((i) => i?.id === Number(id)));
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete("/servico/" + id);
      setDataServico(dataServico?.filter((i) => i?.id !== Number(id)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Menu />
      <Content>
        <Grid container spacing={2}>
          <h3>Serviços</h3>
          <div className="card" style={{ marginBottom: 32 }}>
            <div className="row">
              <div className="green-icon">
                <img src="/Line 1.svg" alt="" />
              </div>
              <div className="card-column">
                <span>Finalizados Ontem</span>
                <h4>{finalizados?.length}</h4>
              </div>
            </div>
            <div className="row">
              <div className="green-icon">
                <img src="/profile-tick.svg" alt="" />
              </div>
              <div className="card-column">
                <span>Aguardando Motorista</span>
                <h4>{aguardando?.length}</h4>
              </div>
            </div>
            <div className="row">
              <div className="green-icon">
                <img src="/package_car.svg" alt="" />
              </div>
              <div className="card-column">
                <span>Serviços em Andamento</span>
                <h4>{servico?.length}</h4>
              </div>
            </div>
          </div>
          {permission !== "motorista" && (
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
          )}
          <CustomTable
            title="Serviços"
            columns={columns}
            data={dataServico}
            style={{
              overflow: "hidden",
            }}
            onEdit={permission !== "motorista" && handleEdit}
            onDelete={permission !== "motorista" && handleDelete}
            CustomComponent={({ record }) => {
              return (
                <IconButton
                  onClick={async () => {
                    if (record?.status_id === "1") {
                      await api.put(`/servico/${record?.id}/iniciar`);
                    } else await api.put(`/servico/${record?.id}/finalizar`);

                    const status = [
                      "AGUARDANDO EXECUCAO",
                      "EM ANDAMENTO",
                      "CONCLUIDO",
                    ];

                    setDataServico(
                      dataServico?.map((i) =>
                        i?.id === record?.id
                          ? {
                              ...i,
                              status_id: record?.status_id + 1,
                              status: status[record?.status_id],
                            }
                          : i
                      )
                    );
                    setIsDrawerOpen(false);
                  }}
                  disabled={record?.status_id === 3}
                >
                  {record?.status_id === 1 ? <PlayArrowIcon /> : <DoneIcon />}
                </IconButton>
              );
            }}
          />
        </Grid>
      </Content>
      <Form
        isOpen={isDrawerOpen}
        onClose={toggleDrawer(false)}
        keys={[
          {
            id: "localidade_id",
            label: "Localidade",
            options: localidade?.map((i) => ({
              label: i?.nome + " (" + i?.cidade + ")",
              value: String(i?.id),
            })),
          },
          {
            id: "motorista_id",
            label: "Motorista",
            options: motoristas?.map((i) => ({
              label: i?.nome + " (" + i?.categoria_cnh + ")",
              value: String(i?.id),
            })),
          },
          {
            id: "veiculo_id",
            label: "Veiculo",
            options: veiculo?.map((i) => ({
              label: i?.nome,
              value: String(i?.id),
            })),
          },
          { id: "descricao", label: "Descrição" },
          {
            id: "prioridade",
            label: "Prioridade",
            options: [
              {
                label: "ALTA",
                value: 1,
              },
              {
                label: "MEDIA",
                value: 2,
              },
              {
                label: "BAIXA",
                value: 3,
              },
            ],
          },
        ]}
        endpoint="/servico"
        onCadastroSucesso={async () => {
          try {
            const res = await api.get("/servico");
            if (res.data.data) setServico(res.data.data);
          } catch (error) {
            console.error(error);
          }
        }}
        name="serviço"
        reset={() => setEditing({})}
        editing={editing}
      />
    </Container>
  );
}
