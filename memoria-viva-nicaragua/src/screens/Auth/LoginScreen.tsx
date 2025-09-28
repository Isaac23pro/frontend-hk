import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import logo from '../../assets/images/logo.png';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FEF001; // Yellow background from prototype
  padding: 1rem;
`;

const Logo = styled.img`
  width: 70%;
  max-width: 250px;
  margin-bottom: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 90%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #FE42B3; // Pink color
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      // The router will handle the redirect on successful login
    } catch (error) {
      console.error('Login failed', error);
      // Here you would show an error message to the user
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Logo src={logo} alt="Memoria Viva Nicaragua Logo" />
      <LoginForm onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginScreen;