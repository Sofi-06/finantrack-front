import { useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Sidebar from '../components/layout/Sidebar';

function DashboardLayout() {
  const [active, setActive] = useState('Dashboard');
  const token = localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token');
  if (!token) return <Navigate to="/login" replace />;
  return <div className="app"><Sidebar active={active} onNavigate={setActive} /><Dashboard /></div>;
}

export default function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<DashboardLayout />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>;
}
