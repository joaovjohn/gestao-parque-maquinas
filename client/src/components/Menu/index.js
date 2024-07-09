import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { makeStyles } from "@mui/styles";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BuildIcon from "@mui/icons-material/Build";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const links = [
  {
    name: "Início",
    icon: <HomeIcon />,
    href: "/",
  },
  {
    name: "Pessoa",
    icon: <PersonIcon />,
    href: "/pessoa",
  },
  {
    name: "Motorista",
    icon: <DriveEtaIcon />,
    href: "/motorista",
  },
  {
    name: "Supervisor",
    icon: <SupervisorAccountIcon />,
    href: "/supervisor",
  },
  {
    name: "Localidade",
    icon: <LocationOnIcon />,
    href: "/localidade",
  },
  {
    name: "Marca",
    icon: <DirectionsCarIcon />,
    href: "/marca",
  },
  { name: "Serviço", icon: <BuildIcon />, href: "/servico" },
];

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const classes = useStyles();
  const { signOut } = useContext(AuthContext);
  const handleSignOut = async (event) => {
    event.preventDefault();
    await signOut(navigate);
  };

  return (
    <Drawer variant="permanent" anchor="left">
      <List className={classes.list}>
        <ListItem component="a" href="/" style={{ justifyContent: "center" }}>
          <img
            src="/logo.png"
            alt=""
            style={{ width: "40%", padding: "20px 0 40px 0" }}
          />
        </ListItem>

        {links?.length > 0 &&
          links?.map((link) => (
            <ListItem
              button
              component="a"
              href={link.href}
              style={
                location?.pathname === link.href ? { color: "#5932EA" } : {}
              }
            >
              <ListItemIcon
                style={
                  location?.pathname === link.href ? { color: "#5932EA" } : {}
                }
              >
                {link.icon}
              </ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          ))}
        <hr style={{ width: "90%" }} />
        <ListItem button component="a" href="/sair" onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Menu;
