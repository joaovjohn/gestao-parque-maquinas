import React, { useState,useEffect } from 'react';
import Menu from '../../components/Menu';
import { CustomTable } from '../../components/CustomTable';
import { api } from '../../api/api';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export function Pessoa() {
  const [pessoa,setPessoa] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const columns = [
    { id: 'id', label: 'ID' },
    { id: 'nome', label: 'Nome' },
    { id: 'cpf', label: 'CPF' },
    { id: 'email', label: 'Email' },
    { id: 'telefone', label: 'Telefone' },
    { id: 'actions', label: 'Actions' },
  ];
  const redirectToForm = () => {
    navigate('/pessoa/cadastro'); 
  };


  useEffect(() => {
    const getPessoa = async () => {
      try {
        const token = localStorage.getItem('@token:user').replace(/['"]+/g, '');
        console.log('Token:', token);
        const res = await api.get('/pessoa',{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Pessoa:', res.data);
        console.log('Pessoa:', res.data.data);
        setPessoa(res.data.data);
      } catch (error) {
        console.error(error);
        setError('Houve um erro ao buscar a pessoa');
      }
    };
    getPessoa();
    console.log('Pessoa:', pessoa);
  }, []);

  const handleEdit = (id) => {
    console.log('Editando', id);
  }
  const handleDelete = (id) => {
    console.log('Deletando', id);
  }

  return (
    <div sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 4
    }}>
      <Button variant="contained" onClick={redirectToForm} sx={{ marginBottom: 2 }}>
        Adicionar Pessoa
      </Button>
      <div sx={{
        width: '80%',
        boxShadow: 3,
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <Menu />
        <CustomTable 
          title="Pessoas"
          columns={columns}
          data={pessoa}
          onEdit={handleEdit}
          onDelete={handleDelete}
          sx={{
            borderRadius: '8px', 
            overflow: 'hidden' 
          }}
        />
      </div>
    </div>
  );
}