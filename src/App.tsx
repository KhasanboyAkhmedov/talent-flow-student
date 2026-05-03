import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/routing/protectedRoute';
import MainLayout from './components/layout/mainLayout';
import Dashboard from './pages/dashboard';
import { useAppDispatch } from './app/hooks';
import { initializeAuth } from './features/auth/authSlice';
import SignIn from './pages/signIn';
import AssessmentsPage from './pages/assessments';
import ProfilePage from './pages/profilePage';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<SignIn />} />

      {/* Protected Routes Wrapper */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-assessments" element={<AssessmentsPage />} />
          {/* <Route path="/candidates" element={<Dashboard />} />
          <Route path="/certificates" element={<Dashboard />} />  */}
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
