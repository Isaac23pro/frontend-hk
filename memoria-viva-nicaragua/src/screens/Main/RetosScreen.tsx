import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getQuizzes } from '../../services/api';
import { Quiz } from '../../types';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  margin: 0;
`;

const CreateButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  font-weight: bold;
  cursor: pointer;
`;

const QuizCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.small};
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }

  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const RetosScreen = () => {
  const [quizzes, setQuizzes] = useState<Omit<Quiz, 'questions'>[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from context

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizId: string) => {
    navigate(`/retos/${quizId}`);
  };

  if (loading) {
    return <p>Cargando retos...</p>;
  }

  return (
    <ScreenContainer>
      <Header>
        <Title>Retos Educativos</Title>
        {/* --- Conditional Rendering for Teacher --- */}
        {user?.role === 'Docente' && (
          <CreateButton onClick={() => alert('Próximamente: ¡Crea tu propio reto educativo!')}>
            Crear Reto
          </CreateButton>
        )}
      </Header>
      {quizzes.map((quiz) => (
        <QuizCard key={quiz.id} onClick={() => handleQuizClick(quiz.id)}>
          <h3>{quiz.title}</h3>
          <p>{quiz.description}</p>
        </QuizCard>
      ))}
    </ScreenContainer>
  );
};

export default RetosScreen;