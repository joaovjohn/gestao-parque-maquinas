import React, { useState,useEffect } from 'react';
import Menu from '../../components/Menu';
import { CustomTable } from '../../components/CustomTable';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { Grid,Button,Typography,Box ,Drawer} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { useTranslation } from 'react-i18next';
import { PessoaCadastro } from './cadastro';

const drawerWidth = 240; 

const Container = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Content = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
}));


export function Pessoa() {
  const [pessoa,setPessoa] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'nome', label: 'Nome' },
    { id: 'cpf', label: 'CPF' },
    { id: 'email', label: 'Email' },
    { id: 'data_nasc', label: 'Data de Nascimento' },
  ];

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  }
  const getPessoa = async () => {
    try {
      const token = localStorage.getItem('@token:user').replace(/['"]+/g, '');
      console.log('Token:', token);
      const res = await api.get('/pessoa',{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPessoa(res.data.data);
    } catch (error) {
      console.error(error);
      setError('Houve um erro ao buscar a pessoa');
    }
  };

  useEffect(() => {
    getPessoa();
  }, []);

  const handleEdit = (id) => {
    console.log('Editando', id);
  }
  const handleDelete = (id) => {
    console.log('Deletando', id);
  }

  return (
    
    <Container>
      <Menu />
      <Content>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Button
              variant="contained"
              onClick={toggleDrawer(true)}
              style={{ width: '100%', marginBottom: 16 }}
            >
              {t('adicionar')}
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Box sx={{ width: '100%', boxShadow: 3, borderRadius: '8px', overflow: 'hidden' }}>
              <CustomTable
                title={t('Pessoa')}
                columns={columns}
                data={pessoa}
                onEdit={handleEdit}
                onDelete={handleDelete}
                style={{ borderRadius: '8px', overflow: 'hidden' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Content>
      <PessoaCadastro
        isOpen={isDrawerOpen}
        onClose={toggleDrawer(false)}
        t={t} 
        onCadastroSucesso={getPessoa}
      />
    </Container>
  );
}