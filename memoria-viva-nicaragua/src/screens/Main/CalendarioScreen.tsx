import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getDepartments } from '../../services/api';
import { Department } from '../../types';

const ScreenContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const DepartmentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
`;

const DepartmentCard = styled.div<{ imageUrl: string }>`
  height: 150px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-image: url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.large};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const CalendarioScreen = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error("Failed to fetch departments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const handleDepartmentClick = (departmentId: string) => {
    navigate(`/calendario/${departmentId}`);
  };

  if (loading) {
    return <p>Cargando departamentos...</p>;
  }

  return (
    <ScreenContainer>
      <Title>Calendario</Title>
      <Subtitle>Elegir Departamento</Subtitle>
      <DepartmentGrid>
        {departments.map((dept) => (
          <DepartmentCard
            key={dept.id}
            imageUrl={dept.imageUrl}
            onClick={() => handleDepartmentClick(dept.id)}
          >
            <span>{dept.name}</span>
          </DepartmentCard>
        ))}
      </DepartmentGrid>
    </ScreenContainer>
  );
};

export default CalendarioScreen;