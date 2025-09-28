import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRanking } from '../../services/api';
import { RankedUser } from '../../types';
import { useNavigate } from 'react-router-dom';

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const RankingTable = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TableRow = styled.div<{ isHeader?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
  background-color: ${({ isHeader, theme }) => isHeader ? theme.colors.background : 'transparent'};
  font-weight: ${({ isHeader }) => isHeader ? 'bold' : 'normal'};

  &:last-child {
    border-bottom: none;
  }
`;

const Position = styled.div`
  flex: 0 0 50px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const Score = styled.div`
  flex: 0 0 80px;
  text-align: right;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ActionButton = styled.button`
    width: 100%;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.tertiary};
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RankingScreen = () => {
  const [ranking, setRanking] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const data = await getRanking();
        setRanking(data);
      } catch (error) {
        console.error("Failed to fetch ranking", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRanking();
  }, []);

  if (loading) {
    return <p>Cargando ranking...</p>;
  }

  return (
    <ScreenContainer>
      <Title>Ranking de Usuarios</Title>
      <ActionButton onClick={() => navigate('/perfil')}>Mi Perfil</ActionButton>
      <RankingTable>
        <TableRow isHeader>
          <Position>#</Position>
          <UserInfo>Usuario</UserInfo>
          <Score>Puntaje</Score>
        </TableRow>
        {ranking.map((user) => (
          <TableRow key={user.id}>
            <Position>{user.position}</Position>
            <UserInfo>
              <Avatar src={user.avatarUrl} alt={user.name} />
              <span>{user.name}</span>
            </UserInfo>
            <Score>{user.score}</Score>
          </TableRow>
        ))}
      </RankingTable>
      <ActionButton onClick={() => navigate('/moderacion')}>Panel de Moderación</ActionButton>
    </ScreenContainer>
  );
};

export default RankingScreen;