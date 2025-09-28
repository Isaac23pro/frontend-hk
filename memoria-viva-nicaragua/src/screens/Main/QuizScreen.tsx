import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getQuizById } from '../../services/api';
import { Quiz, Question, Answer } from '../../types';

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const QuestionCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const QuestionText = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const AnswerButton = styled.button<{ state?: 'correct' | 'incorrect' }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 2px solid ${({ theme }) => theme.colors.tertiary};
  background-color: ${({ theme, state }) => {
    if (state === 'correct') return theme.colors.accent;
    if (state === 'incorrect') return theme.colors.secondary;
    return theme.colors.white;
  }};
  color: ${({ theme, state }) => (state ? theme.colors.white : theme.colors.text)};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

const QuizScreen = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!quizId) return;
    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(quizId);
        setQuiz(data || null);
      } catch (error) {
        console.error("Failed to fetch quiz", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerClick = (answer: Answer) => {
    if (selectedAnswer) return; // Prevent multiple clicks

    setSelectedAnswer(answer);
    if (answer.isCorrect) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (quiz && nextQuestion < quiz.questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
      } else {
        // Navigate to results screen
        navigate(`/retos/resultado/${score + (answer.isCorrect ? 1 : 0)}/${quiz?.questions.length}`);
      }
    }, 1500); // Wait 1.5 seconds before next question or results
  };

  if (loading) return <p>Cargando reto...</p>;
  if (!quiz) return <p>Reto no encontrado.</p>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <ScreenContainer>
      <h1>{quiz.title}</h1>
      <p>Pregunta {currentQuestionIndex + 1} de {quiz.questions.length}</p>
      <QuestionCard>
        <QuestionText>{currentQuestion.text}</QuestionText>
        <div>
          {currentQuestion.answers.map((answer, index) => {
            let state: 'correct' | 'incorrect' | undefined;
            if (selectedAnswer && answer.isCorrect) {
              state = 'correct';
            } else if (selectedAnswer === answer && !answer.isCorrect) {
              state = 'incorrect';
            }
            return (
              <AnswerButton
                key={index}
                onClick={() => handleAnswerClick(answer)}
                disabled={!!selectedAnswer}
                state={state}
              >
                {answer.text}
              </AnswerButton>
            );
          })}
        </div>
      </QuestionCard>
    </ScreenContainer>
  );
};

export default QuizScreen;