import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { CustomTable } from "../../components/CustomTable";
import { api } from "../../api/api";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
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
  const [aguardando, setAguardando] = useState([]);
  const [finalizados, setFinalizados] = useState([]);

  const columns = [
    { id: "localidade", label: "Localidade" },
    { id: "motorista", label: "Motorista" },
    { id: "dt_inicio", type: "data", label: "Inicío" },
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

    getAguardando();
    getFinalizados();
    getServicos();
  }, []);

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

          <CustomTable
            title="Serviços"
            columns={columns}
            data={servico}
            style={{
              overflow: "hidden",
            }}
            customButton={
              <IconButton onClick={() => console.log("custom button action")}>
                <MoveToInboxIcon />
              </IconButton>
            }
          />
        </Grid>
      </Content>
    </Container>
  );
}
