import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 120px);
`;

const ResultCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 90%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const ScoreText = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;

  strong {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const BackButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes.large};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const QuizResultScreen = () => {
  const { score, total } = useParams<{ score: string; total: string }>();
  const navigate = useNavigate();

  return (
    <ScreenContainer>
      <ResultCard>
        <Title>¡Reto Completado!</Title>
        <ScoreText>
          Tu puntuación es:<br />
          <strong>{score} / {total}</strong>
        </ScoreText>
        <BackButton onClick={() => navigate('/retos')}>
          Volver a los retos
        </BackButton>
      </ResultCard>
    </ScreenContainer>
  );
};

export default QuizResultScreen;