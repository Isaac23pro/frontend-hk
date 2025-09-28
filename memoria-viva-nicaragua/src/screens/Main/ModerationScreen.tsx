import React, { useState } from 'react';
import styled from 'styled-components';

const mockPendingContent = [
  { id: 'mem101', title: 'Recuerdos de la Purísima', type: 'Memoria' },
  { id: 'mem102', title: 'Mi receta de Indio Viejo', type: 'Receta' },
  { id: 'mem103', title: 'El cadejo en mi barrio', type: 'Leyenda' },
];

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ContentCard = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Button = styled.button<{ approve?: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme, approve }) => approve ? theme.colors.accent : theme.colors.secondary};
  color: ${({ theme, approve }) => approve ? theme.colors.black : theme.colors.white};
`;

const ModerationScreen = () => {
  const [pending, setPending] = useState(mockPendingContent);

  const handleDecision = (id: string) => {
    setPending(current => current.filter(item => item.id !== id));
  };

  return (
    <ScreenContainer>
      <Title>Panel de Moderación</Title>
      {pending.length > 0 ? (
        pending.map(item => (
          <ContentCard key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>Tipo: {item.type}</p>
            </div>
            <ActionButtons>
              <Button approve onClick={() => handleDecision(item.id)}>Aprobar</Button>
              <Button onClick={() => handleDecision(item.id)}>Rechazar</Button>
            </ActionButtons>
          </ContentCard>
        ))
      ) : (
        <p>No hay contenido pendiente de revisión. ¡Buen trabajo!</p>
      )}
    </ScreenContainer>
  );
};

export default ModerationScreen;