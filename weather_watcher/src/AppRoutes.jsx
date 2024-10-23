import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Location from './pages/Location';

export default function AppRoutes () {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/location" element={<Location />} />
          <Route path="*" element={<Home />} />
        </Routes>
      );
};