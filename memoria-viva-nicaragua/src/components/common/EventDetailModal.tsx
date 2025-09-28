import React from 'react';
import styled from 'styled-components';
import { CulturalEvent } from '../../types';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const EventTitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const EventSubtitle = styled.p`
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EventDescription = styled.p`
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const InfoRow = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  strong {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const NotifyButton = styled.button`
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


interface EventDetailModalProps {
  event: CulturalEvent;
  onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <EventTitle>{event.name}</EventTitle>
        <EventSubtitle>{event.municipality}</EventSubtitle>
        <EventDescription>{event.description}</EventDescription>
        <InfoRow><strong>Lugar:</strong> {event.location}</InfoRow>
        <InfoRow><strong>Hora:</strong> {event.time}</InfoRow>
        <NotifyButton>Notificar</NotifyButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default EventDetailModal;