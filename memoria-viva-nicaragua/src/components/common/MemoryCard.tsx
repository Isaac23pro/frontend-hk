import React from 'react';
import styled from 'styled-components';
import { Memory } from '../../types';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.small};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-weight: bold;
`;

const CardMedia = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  line-height: 1.5;
`;

const CardActions = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.background};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.medium};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

interface MemoryCardProps {
  memory: Memory;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
  return (
    <Card>
      <CardHeader>{memory.author.name}</CardHeader>
      <CardMedia src={memory.mediaUrl} alt={memory.title} />
      <CardContent>
        <Title>{memory.title}</Title>
        <Description>{memory.description}</Description>
      </CardContent>
      <CardActions>
        <ActionButton>
          <span>❤️</span> {memory.likes}
        </ActionButton>
        <ActionButton>
          <span>💬</span> {memory.commentsCount}
        </ActionButton>
      </CardActions>
    </Card>
  );
};

export default MemoryCard;