import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { getContentForMap } from '../../services/api';
import { Memory, CulturalEvent } from '../../types';

// Fix for default icon issue with React-Leaflet and Webpack
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;


const MapWrapper = styled.div`
  height: calc(100vh - 120px); // Full height minus header/tabbar
  width: 100%;

  .leaflet-container {
    height: 100%;
    width: 100%;
  }
`;

const FilterContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background-color: ${({ active, theme }) => active ? theme.colors.secondary : theme.colors.white};
  color: ${({ active, theme }) => active ? theme.colors.white : theme.colors.secondary};
  font-weight: bold;
  cursor: pointer;
`;


type MapContent = (Memory | CulturalEvent);
type FilterType = 'all' | 'memory' | 'event';

const MapaScreen = () => {
  const [content, setContent] = useState<MapContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mapContent = await getContentForMap();
        setContent(mapContent);
      } catch (error) {
        console.error("Failed to fetch map content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredContent = content.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'memory') return 'title' in item; // 'title' is unique to Memory type
    if (filter === 'event') return 'name' in item; // 'name' is unique to CulturalEvent
    return false;
  });

  if (loading) {
    return <p>Cargando mapa...</p>;
  }

  return (
    <div>
      <FilterContainer>
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>Todos</FilterButton>
        <FilterButton active={filter === 'memory'} onClick={() => setFilter('memory')}>Memorias</FilterButton>
        <FilterButton active={filter === 'event'} onClick={() => setFilter('event')}>Eventos</FilterButton>
      </FilterContainer>
      <MapWrapper>
        <MapContainer center={[12.8654, -85.2072]} zoom={7} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredContent.map(item => (
            <Marker key={item.id} position={item.coordinates}>
              <Popup>
                <strong>{'title' in item ? item.title : item.name}</strong>
                <p>{item.description.substring(0, 50)}...</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </MapWrapper>
    </div>
  );
};

export default MapaScreen;