import React,{ useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { makeStyles } from '@mui/styles';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BuildIcon from '@mui/icons-material/Build';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AuthContext } from '../../contexts/authContext'; 
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

const Menu = () => {
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
        <ListItem button component="a" href="/inicio">
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Início" />
        </ListItem>
        <ListItem button component="a" href="/pessoa">
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <ListItemText primary="Pessoa" />
        </ListItem>
        <ListItem button component="a" href="/motorista">
          <ListItemIcon><DriveEtaIcon /></ListItemIcon>
          <ListItemText primary="Motorista" />
        </ListItem>
        <ListItem button component="a" href="/supervisor">
          <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
          <ListItemText primary="Supervisor" />
        </ListItem>
        <ListItem button component="a" href="/localidade">
          <ListItemIcon><LocationOnIcon /></ListItemIcon>
          <ListItemText primary="Localidade" />
        </ListItem>
        <ListItem button component="a" href="/marca">
          <ListItemIcon><DirectionsCarIcon /></ListItemIcon>
          <ListItemText primary="Marca" />
        </ListItem>
        <ListItem button component="a" href="/servico">
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="Serviço" />
        </ListItem>
        <ListItem button component="a" href="/sair" onClick={handleSignOut}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary="Sair" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Menu;