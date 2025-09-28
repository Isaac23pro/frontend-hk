import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import logo from '../../assets/images/logo.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const Logo = styled.img`
  width: 80%;
  max-width: 300px;
  margin-bottom: 2rem;
`;

const WelcomeText = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const WelcomeScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500); // 2.5 second delay before redirecting

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <WelcomeContainer>
      <Logo src={logo} alt="Memoria Viva Nicaragua Logo" />
      <WelcomeText>Bienvenido a la app</WelcomeText>
    </WelcomeContainer>
  );
};

export default WelcomeScreen;