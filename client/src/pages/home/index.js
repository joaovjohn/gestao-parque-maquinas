import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu";
import { CustomTable } from "../../components/CustomTable";
import { api } from "../../api/api";
import { Grid } from "@mui/material";
import { PieChart } from "react-minimal-pie-chart";

import { styled } from "@mui/material/styles";
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

export function Home() {
  const [servico, setServico] = useState([]);
  const [motorista, setMotorista] = useState([]);
  const [veiculo, setVeiculo] = useState([]);
  const [picaVeiculo, setPicaVeiculo] = useState([]);
  const [picaMotorista, setPicaMotorista] = useState([]);

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

    const getMotoristas = async () => {
      try {
        const res = await api.get("/motoristas-disponiveis");
        if (res.data.data) setMotorista(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getVeiculos = async () => {
      try {
        const res = await api.get("/veiculos-disponiveis");
        if (res.data.data) setVeiculo(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getHorasVeiculos = async () => {
      try {
        const res = await api.get("/veiculo-horas");
        if (res.data.data) setPicaVeiculo(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const getHorasMotoristas = async () => {
      try {
        const res = await api.get("/motorista-horas-trabalhadas");
        if (res.data.data) setPicaMotorista(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getHorasVeiculos();
    getHorasMotoristas();
    getMotoristas();
    getVeiculos();
    getServicos();
  }, []);

  function randomColorUtility(length) {
    return Math.floor(Math.random() * length);
  }

  function hexy() {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }
    return hexColor;
  }

  return (
    <Container>
      <Menu />
      <Content>
        <Grid container spacing={2}>
          <h3>Inicío</h3>
          <div className="card" style={{ marginBottom: 32 }}>
            <div className="row">
              <div className="green-icon">
                <img src="/profile-tick.png" alt="" />
              </div>
              <div className="card-column">
                <span>Motoristas Disponíveis</span>
                <h4>{motorista?.length}</h4>
              </div>
            </div>
            <div className="row">
              <div className="green-icon">
                <img src="/package_car.svg" alt="" />
              </div>
              <div className="card-column">
                <span>Máquinas Disponíveis</span>
                <h4>{veiculo?.length}</h4>
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
            title="Serviços em Andamento"
            columns={columns}
            data={servico}
            style={{
              borderRadius: "8px",
              overflow: "hidden",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 2fr",
              gap: 32,
              width: "100%",
              marginTop: 32,
            }}
          >
            <div
              className="card"
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <h3>Motoristas</h3>
              <PieChart
                style={{ width: "50%" }}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={{ fontSize: 4 }}
                data={picaMotorista
                  ?.filter((i) => !!i?.horas_trabalhadas)
                  ?.map((i) => ({
                    title: i?.nome,
                    value: Number(i?.horas_trabalhadas),
                    color: hexy(),
                  }))}
              />
            </div>
            <div
              className="card"
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <h3>Veículos</h3>
              <PieChart
                style={{ width: "50%" }}
                label={({ dataEntry }) => dataEntry.title}
                labelStyle={{ fontSize: 4 }}
                data={picaVeiculo
                  ?.filter((i) => !!i?.horas)
                  ?.map((i) => ({
                    title: i?.veiculo,
                    value: Number(i?.horas),
                    color: hexy(),
                  }))}
              />
            </div>
          </div>
        </Grid>
      </Content>
    </Container>
  );
}
