import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SignedIn, SignedOut } from '../context/ClerkNavAuth';
import { FiArrowRight, FiPlay, FiStar, FiUser, FiActivity } from 'react-icons/fi';
import Testimonials from './Testimonials';
import './Home.css';

function isUserLoggedIn() {
  // Check login status from localStorage (or Clerk if available)
  return localStorage.getItem('isLoggedIn') === 'true';
}

const Home = () => {
  // Add animation state for quote
  const [quoteVisible, setQuoteVisible] = useState(false);
  const signInBtnRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(isUserLoggedIn());

  // Add animations when component mounts
  useEffect(() => {
    // Animate hero content with a smooth fade-in effect
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 300);
    }
    
    // Animate hero image with a smooth fade-in effect
    const heroImage = document.querySelector('.hero-image-glass');
    if (heroImage) {
      setTimeout(() => {
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateY(0)';
      }, 600);
    }
    
    // Animate quote section
    setTimeout(() => {
      setQuoteVisible(true);
    }, 1000);

    // Listen for login status changes
    const handleStorage = () => setLoggedIn(isUserLoggedIn());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="home-landing">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-block">Transform Your Body</span>
            <span className="hero-title-gradient">Transform Your Life</span>
          </h1>
          <p className="hero-description">
            Get personalized workout plans, expert trainers, and a supportive community to help you achieve your fitness goals.
          </p>
          
          {/* Dynamic CTA based on authentication status */}
          <div className="cta-container">
            <SignedOut>
              <div className="auth-buttons">
                <Link to="/login">
                  <motion.button 
                    className="cta-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiPlay className="button-icon" />
                    Login to Continue
                  </motion.button>
                </Link>
              </div>
              <div className="features-preview">
                <div className="feature-item">
                  <FiUser className="feature-icon" />
                  <span>Personalized Plans</span>
                </div>
                <div className="feature-item">
                  <FiActivity className="feature-icon" />
                  <span>Expert Trainers</span>
                </div>
                <div className="feature-item">
                  <FiStar className="feature-icon" />
                  <span>Track Progress</span>
                </div>
              </div>
            </SignedOut>
            
            <SignedIn>
              <div className="welcome-back">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="welcome-title">Welcome back! Ready to continue your fitness journey?</h3>
                  <Link to="/workouts">
                    <motion.button 
                      className="cta-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiActivity className="button-icon" />
                      Continue Workouts
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </SignedIn>
          </div>
        </div>
        
        <div className="hero-image-glass">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Fitness Hero" 
            className="hero-image" 
          />
        </div>
      </section>

      {/* Stats Section */}
      <SignedOut>
        <section className="stats-section">
          <div className="stats-container">
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Members</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-number">500+</div>
              <div className="stat-label">Workout Plans</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-number">50+</div>
              <div className="stat-label">Expert Trainers</div>
            </motion.div>
            <motion.div 
              className="stat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-number">99%</div>
              <div className="stat-label">Success Rate</div>
            </motion.div>
          </div>
        </section>
      </SignedOut>

      {/* Motivational Quote Section */}
      <section className={`quote-section ${quoteVisible ? 'visible' : ''}`}>
        <div className="quote-container">
          <div className="quote-icon">❝</div>
          <blockquote className="quote-text">
            The only bad workout is the one that didn't happen. Fitness is not about being better than someone else, it's about being better than you used to be.
          </blockquote>
          <div className="quote-attribution">- Someone Brave</div>
        </div>
      </section>
      
      <Testimonials />
    </div>
  );
};

export default Home;
