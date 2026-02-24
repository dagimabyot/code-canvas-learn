import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from './AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import UserLogin from './pages/UserLogin';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import ProfilePage from './pages/ProfilePage';
import CourseView from './pages/CourseView';
import CourseCatalog from './pages/CourseCatalog';
import AdminDashboard from './pages/AdminDashboard';
import Leaderboard from './pages/Leaderboard';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  const { user, loading, checkUser } = useAppContext();
  const location = useLocation();

  useEffect(() => {
    checkUser();
    // Enforce bright theme by default
    document.body.classList.add('bright-theme');
    // Ensure scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const ProtectedRoute = ({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) => {
    if (!user) {
      return <Navigate to={adminOnly ? "/admin/login" : "/login"} state={{ from: location }} replace />;
    }
    
    if (adminOnly && user.role !== 'admin') {
      return <Navigate to="/" replace />;
    }

    return <>{children}</>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/courses/:courseId" element={<CourseView />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default App;
