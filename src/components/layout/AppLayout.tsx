import { useMemo, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const months = [
  'Enero 2026', 'Febrero 2026', 'Marzo 2026', 'Abril 2026',
  'Mayo 2026', 'Junio 2026', 'Julio 2026', 'Agosto 2026',
  'Septiembre 2026', 'Octubre 2026', 'Noviembre 2026', 'Diciembre 2026',
];

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Tu resumen financiero del mes' },
  '/transactions': { title: 'Movimientos', subtitle: 'Consulta y administra tus movimientos' },
  '/accounts': { title: 'Cuentas', subtitle: 'Administra tus bancos, billeteras y efectivo' },
  '/categories': { title: 'Categorías', subtitle: 'Organiza tus ingresos y gastos' },
  '/people': { title: 'Personas', subtitle: 'Administra tus contactos financieros' },
  '/reports': { title: 'Reportes', subtitle: 'Analiza el comportamiento de tus finanzas' },
  '/settings': { title: 'Configuración', subtitle: 'Personaliza tu experiencia en FinanTrack' },
};

export default function AppLayout() {
  const { pathname } = useLocation();
  const [monthIndex, setMonthIndex] = useState(7);
  const meta = useMemo(() => pageMeta[pathname] ?? pageMeta['/dashboard'], [pathname]);

  const moveMonth = (step: number) => {
    setMonthIndex((current) => (current + step + months.length) % months.length);
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="workspace">
        <Navbar
          title={meta.title}
          subtitle={meta.subtitle}
          month={months[monthIndex]}
          onPreviousMonth={() => moveMonth(-1)}
          onNextMonth={() => moveMonth(1)}
        />
        <Outlet />
      </div>
    </div>
  );
}
