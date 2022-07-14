import React from 'react'
import { useLocation, Routes, Route } from "react-router-dom";
import Notfound from './pages/404/Notfound';
import Dashboard from './pages/dashboard/Dashboard';
import Landing from './pages/landing/Landing';
import Signup from './pages/signup/Signup';
import { AnimatePresence } from 'framer-motion'

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path="*" element={<Notfound />} />
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes