import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.background};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.secondary};
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

const CreateMemoryScreen = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      alert('¡Memoria enviada para moderación! Gracias por contribuir.');
      setIsSubmitting(false);
      navigate('/feed');
    }, 1500);
  };

  return (
    <ScreenContainer>
      <Title>Crear Nueva Memoria</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Título de tu memoria" required />
        <TextArea placeholder="Describe tu historia o recuerdo..." required />
        <div>
          <label htmlFor="media-upload">Sube una foto, video o audio:</label>
          <Input id="media-upload" type="file" />
        </div>
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Memoria'}
        </SubmitButton>
      </Form>
    </ScreenContainer>
  );
};

export default CreateMemoryScreen;