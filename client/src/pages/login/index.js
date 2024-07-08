import React, { useState,useContext } from 'react';
import { AuthContext } from '../../contexts/authContext'; // Ajuste o caminho conforme necessário

export function Login() {
  const [login, setlogin] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(login, password);
    } catch (error) {
      console.log('Erro:', error);
    }
  
  };

  return (
    <div className="container">
      <img src="" alt="" className="" />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Usuário:</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setlogin(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>
      </form>
    </div>
  );
}
