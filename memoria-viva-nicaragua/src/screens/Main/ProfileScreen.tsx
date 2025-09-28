import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  h1 {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  p {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.small};

  p {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
`;

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // The AppRouter will automatically navigate to the login screen
  };

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  return (
    <ScreenContainer>
      <ProfileHeader>
        <Avatar src={`https://i.pravatar.cc/150?u=${user.id}`} alt="User Avatar" />
        <UserInfo>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <p>Rol: {user.role}</p>
        </UserInfo>
      </ProfileHeader>

      <h2>Estadísticas</h2>
      <StatsContainer>
        <StatCard>
          <p>12</p>
          <span>Memorias Creadas</span>
        </StatCard>
        <StatCard>
          <p>850</p>
          <span>Puntos Totales</span>
        </StatCard>
      </StatsContainer>

      <LogoutButton onClick={handleLogout}>Cerrar Sesión</LogoutButton>
    </ScreenContainer>
  );
};

export default ProfileScreen;