import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Farmers from './pages/Farmers';
import Produce from './pages/Produce';
import Inspections from './pages/Inspections';
import Warehouses from './pages/Warehouses';
import Shipments from './pages/Shipments';
import SupplyChain from './pages/SupplyChain';
import Reports from './pages/Reports';
import Traceability from './pages/Traceability';
import { Menu, Search, Bell } from 'lucide-react';
import './App.css';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/trace/:batchId" element={<Traceability />} />
        <Route path="/*" element={
          <ProtectedRoute>
            <div className="app-layout">
              <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
              <div className="workspace">
                <header className="topbar">
                  <button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open menu"><Menu size={21}/></button>
                  <div className="topbar-search"><Search size={17}/><span>Search batches, farmers, shipments...</span><kbd>⌘ K</kbd></div>
                  <div className="topbar-actions"><button className="icon-button" aria-label="Notifications"><Bell size={19}/><i></i></button></div>
                </header>
                <main className="main-content">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/farmers" element={<Farmers />} />
                    <Route path="/produce" element={<Produce />} />
                    <Route path="/inspections" element={<Inspections />} />
                    <Route path="/warehouses" element={<Warehouses />} />
                    <Route path="/shipments" element={<Shipments />} />
                    <Route path="/supply-chain" element={<SupplyChain />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default function App(){return <AuthProvider><AppContent /></AuthProvider>}
