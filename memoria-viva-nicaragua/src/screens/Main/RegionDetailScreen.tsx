import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// Mock data for a region
const regionData = {
  carazo: {
    name: 'Carazo',
    description: 'Carazo es café, melcocha, picadillo y ajiaco, es el Güegüense irónico, es el Toro Huaco danzando, es tradición, playa y mar pacífico; Carazo es el departamento de la producción, es la tierra de los dirianes.',
    headerImage: 'https://via.placeholder.com/400x200/FE42B3/FFFFFF?text=Carazo',
    municipalities: [
      { name: 'Santa Teresa', color: '#FE42B3' },
      { name: 'La Conquista', color: '#29A0D5' },
      { name: 'La Paz', color: '#FEF001' },
      { name: 'El Rosario', color: '#4AFF80' },
      { name: 'Diriamba', color: '#29A0D5' },
      { name: 'San Marcos', color: '#4AFF80' },
    ],
  },
};

const ScreenContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MunicipalitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const MunicipalityItem = styled.div<{ color: string }>`
  cursor: pointer;
  p {
    margin-top: ${({ theme }) => theme.spacing.xs};
    font-weight: bold;
  }
  /* Placeholder for municipality map shape */
  &::before {
    content: '';
    display: block;
    width: 80px;
    height: 80px;
    margin: 0 auto;
    background-color: ${({ color }) => color}33; /* 20% opacity */
    mask-image: url('https://via.placeholder.com/80x80?text=Shape'); /* Needs real SVG mask */
    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;
  }
`;

const RegionDetailScreen = () => {
  const { regionName } = useParams<{ regionName: keyof typeof regionData }>();

  // For now, we only have data for 'carazo'
  const data = regionName ? regionData[regionName] : null;

  if (!data) {
    return <div>Región no encontrada.</div>;
  }

  return (
    <ScreenContainer>
      <HeaderImage src={data.headerImage} alt={`Imagen de ${data.name}`} />
      <Content>
        <Title>{data.name}</Title>
        <Description>{data.description}</Description>
        <MunicipalitiesGrid>
          {data.municipalities.map((mun) => (
            <MunicipalityItem key={mun.name} color={mun.color}>
              <p>{mun.name}</p>
            </MunicipalityItem>
          ))}
        </MunicipalitiesGrid>
      </Content>
    </ScreenContainer>
  );
};

export default RegionDetailScreen;