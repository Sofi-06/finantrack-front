import { CreditCard, LayoutDashboard, PieChart, Plus, Settings, Tags, Users, Wallet } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const items = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Movimientos', icon: Wallet, to: '/transactions' },
  { label: 'Cuentas', icon: CreditCard, to: '/accounts' },
  { label: 'Categorías', icon: Tags, to: '/categories' },
  { label: 'Personas', icon: Users, to: '/people' },
  { label: 'Reportes', icon: PieChart, to: '/reports' },
  { label: 'Configuración', icon: Settings, to: '/settings' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <NavLink className="brand" to="/dashboard" aria-label="Ir al dashboard de FinanTrack">
        <span className="brand-mark"><Wallet size={25} /></span>
        <span>FinanTrack</span>
      </NavLink>

      <nav aria-label="Navegación principal">
        {items.map(({ label, icon: Icon, to }) => (
          <NavLink key={label} to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <Icon size={23} strokeWidth={1.9} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <NavLink className="new-movement" to="/transactions">
        <Plus size={21} />
        <span>Nuevo movimiento</span>
      </NavLink>
    </aside>
  );
}
