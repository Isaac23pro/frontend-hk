import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginScreen from '../screens/Auth/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import WelcomeScreen from '../screens/Auth/WelcomeScreen'; // Will create this next

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<Navigate to="/welcome" />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<MainTabNavigator />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;