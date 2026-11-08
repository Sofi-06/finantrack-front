import { Navigate, Outlet, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import AppLayout from '../components/layout/AppLayout';
import ComingSoon from '../components/ui/ComingSoon';

function RequireAuth() {
  const token = localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token');
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default function AppRoutes() {
  return <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<RequireAuth />}>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<ComingSoon title="Movimientos" description="Aquí podrás registrar, filtrar y consultar todos tus movimientos." />} />
        <Route path="/accounts" element={<ComingSoon title="Cuentas" description="Aquí podrás administrar tus bancos, billeteras y dinero en efectivo." />} />
        <Route path="/categories" element={<ComingSoon title="Categorías" description="Aquí podrás organizar las categorías de tus ingresos y gastos." />} />
        <Route path="/people" element={<ComingSoon title="Personas" description="Aquí podrás llevar el control de préstamos y pagos entre personas." />} />
        <Route path="/reports" element={<ComingSoon title="Reportes" description="Aquí encontrarás análisis y reportes detallados de tus finanzas." />} />
        <Route path="/settings" element={<ComingSoon title="Configuración" description="Aquí podrás personalizar tu cuenta y las preferencias de FinanTrack." />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>;
}
