import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background-image: url('https://via.placeholder.com/400x300/29A0D5/FFFFFF?text=Mapa+de+Nicaragua');
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

const CategoryButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

const MitosButton = styled(CategoryButton)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.white};
`;

const GastronomiaButton = styled(CategoryButton)`
  background-color: ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.white};
`;


const BibliotecaScreen = () => {
  const navigate = useNavigate();

  const handleRegionClick = (regionName: string) => {
    navigate(`/biblioteca/${regionName.toLowerCase()}`);
  };

  return (
    <ScreenContainer>
      <Title>Biblioteca</Title>
      <Subtitle>Explora historia, cultura y tradición de cada región del país</Subtitle>

      <p>Explora por región</p>
      {/* Hardcoded to 'carazo' to match available mock data */}
      <MapPlaceholder onClick={() => handleRegionClick('carazo')} />

      <MitosButton>Mitos y leyendas populares</MitosButton>
      <GastronomiaButton>Gastronomía nacional</GastronomiaButton>
    </ScreenContainer>
  );
};

export default BibliotecaScreen;