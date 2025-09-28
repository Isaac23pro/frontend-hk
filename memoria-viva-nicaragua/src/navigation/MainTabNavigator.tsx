import React from 'react';
import { NavLink, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import FeedScreen from '../screens/Main/FeedScreen';
import BibliotecaScreen from '../screens/Main/BibliotecaScreen';
import CalendarioScreen from '../screens/Main/CalendarioScreen';
import MapaScreen from '../screens/Main/MapaScreen';
import RetosScreen from '../screens/Main/RetosScreen';
import RankingScreen from '../screens/Main/RankingScreen';
import RegionDetailScreen from '../screens/Main/RegionDetailScreen';
import DepartmentCalendarScreen from '../screens/Main/DepartmentCalendarScreen';
import QuizScreen from '../screens/Main/QuizScreen';
import QuizResultScreen from '../screens/Main/QuizResultScreen';
import CreateMemoryScreen from '../screens/Main/CreateMemoryScreen';
import ProfileScreen from '../screens/Main/ProfileScreen'; // Import Profile
import ModerationScreen from '../screens/Main/ModerationScreen'; // Import Moderation

const TabBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 100;
`;

const TabItem = styled(NavLink)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;

  &.active {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &::before { content: '●'; font-size: 20px; margin-bottom: 4px; }
`;

const MainContent = styled.main`
  padding-bottom: 60px;
`;

const MainTabNavigator = () => {
  const location = useLocation();
  const showTabBar = ['/feed', '/biblioteca', '/calendario', '/mapa', '/retos', '/ranking'].includes(location.pathname);

  return (
    <>
      <MainContent>
        <Routes>
          <Route path="/feed" element={<FeedScreen />} />
          <Route path="/crear-memoria" element={<CreateMemoryScreen />} />
          <Route path="/biblioteca" element={<BibliotecaScreen />} />
          <Route path="/biblioteca/:regionName" element={<RegionDetailScreen />} />
          <Route path="/calendario" element={<CalendarioScreen />} />
          <Route path="/calendario/:departmentId" element={<DepartmentCalendarScreen />} />
          <Route path="/mapa" element={<MapaScreen />} />
          <Route path="/retos" element={<RetosScreen />} />
          <Route path="/retos/:quizId" element={<QuizScreen />} />
          <Route path="/retos/resultado/:score/:total" element={<QuizResultScreen />} />
          <Route path="/ranking" element={<RankingScreen />} />
          <Route path="/perfil" element={<ProfileScreen />} />
          <Route path="/moderacion" element={<ModerationScreen />} />
          <Route path="*" element={<Navigate to="/feed" />} />
        </Routes>
      </MainContent>
      {showTabBar && (
        <TabBar>
          <TabItem to="/feed">Feed</TabItem>
          <TabItem to="/biblioteca">Biblioteca</TabItem>
          <TabItem to="/calendario">Calendario</TabItem>
          <TabItem to="/mapa">Mapa</TabItem>
          <TabItem to="/retos">Retos</TabItem>
          <TabItem to="/ranking">Ranking</TabItem>
        </TabBar>
      )}
    </>
  );
};

export default MainTabNavigator;