import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from '../components/pages/HomePage';
import { AboutPage } from '../components/pages/AboutPage';
import { SignUpPage } from '../components/pages/SignUpPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />


      </Routes>
    </Router>
  );
};

export default AppRoutes;
