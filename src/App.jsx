import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import { FiEdit2, FiAward, FiActivity, FiUser } from "react-icons/fi";

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Workouts from './pages/Workouts';
import Plans from './pages/Plans';
import Trainers from './pages/Trainers';
import Profile from './pages/Profile';
import Testimonials from './pages/Testimonials';
import './pages/PageStyles.css';

// Import context/auth components
import Auth from './context/Auth';
import RequireAuth from './context/RequireAuth';

// App Content Component (needs to be inside Router to use navigation hooks)
const AppContent = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Update local state when Clerk auth state changes
  useEffect(() => {
    if (isLoaded) {
      const wasLoggedIn = isLoggedIn;
      setIsLoggedIn(isSignedIn);
      
      // Also update localStorage for compatibility with existing code
      localStorage.setItem('isLoggedIn', isSignedIn.toString());
      
      // Redirect to workouts page after successful login
      if (isSignedIn && !wasLoggedIn && !hasRedirected && location.pathname === '/') {
        setHasRedirected(true);
        setTimeout(() => navigate('/workouts'), 100); // Small delay to ensure smooth transition
      }
      
      // Reset redirect flag when user logs out
      if (!isSignedIn && wasLoggedIn) {
        setHasRedirected(false);
      }
    }
  }, [isSignedIn, isLoaded, isLoggedIn, hasRedirected, navigate, location.pathname]);

  // Show loading spinner while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                // Redirect logged-in users to workouts page
                isSignedIn ? <Navigate to="/workouts" replace /> : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Home />
                  </motion.div>
                )
              } 
            />
            <Route 
              path="/login" 
              element={
                // Redirect logged-in users to workouts page
                isSignedIn ? <Navigate to="/workouts" replace /> : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Auth />
                  </motion.div>
                )
              } 
            />
              
              <Route 
                path="/plans" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Plans />
                  </motion.div>
                } 
              />

              <Route 
                path="/trainers" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Trainers />
                  </motion.div>
                } 
              />

              <Route 
                path="/testimonials" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Testimonials />
                  </motion.div>
                } 
              />

              <Route 
                path="/feedback" 
                element={
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Feedback />
                  </motion.div>
                } 
              />

              {/* Protected Routes - Require Authentication */}
              <Route 
                path="/workouts" 
                element={
                  <RequireAuth>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Workouts />
                    </motion.div>
                  </RequireAuth>
                } 
              />

              <Route 
                path="/profile" 
                element={
                  <RequireAuth>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Profile />
                    </motion.div>
                  </RequireAuth>
                } 
              />

              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <Footer />
      </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
