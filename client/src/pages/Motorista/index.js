import React, { useState } from 'react';

export function Motorista() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnh, setCnh] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password!== confirmPassword) {
      setError('Senhas não conferem');
    } else {
      setError(null);
      // Aqui você pode fazer a requisição para o backend
      console.log('Cadastro realizado com sucesso!');
    }
  };

  return (
    <div className="App">
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <br />
        <label>
          CPF:
          <input type="text" value={cpf} onChange={(event) => setCpf(event.target.value)} />
        </label>
        <br />
        <label>
          CNH:
          <input type="text" value={cnh} onChange={(event) => setCnh(event.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Senha:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        <label>
          Confirmar Senha:
          <input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
        </label>
        <br />
        {error && <div style={{ color: 'ed' }}>{error}</div>}
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}