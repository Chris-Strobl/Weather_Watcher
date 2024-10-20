import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Location from './components/Location';
import About from './components/About';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/location" element={<Location />}/> 
            <Route path="/about" element={<About />}/>
        </Routes>
    );
};

export default AppRoutes;