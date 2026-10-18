import { CreditCard, LayoutDashboard, PieChart, Plus, Settings, Tags, Users, Wallet } from 'lucide-react';

type Props = { active: string; onNavigate: (label: string) => void };

export default function Sidebar({ active, onNavigate }: Props) {
  const items = [
    { label: 'Dashboard', icon: LayoutDashboard }, { label: 'Movimientos', icon: Wallet },
    { label: 'Cuentas', icon: CreditCard }, { label: 'Categorías', icon: Tags },
    { label: 'Personas', icon: Users }, { label: 'Reportes', icon: PieChart },
    { label: 'Configuración', icon: Settings },
  ];
  return <aside className="sidebar">
    <div className="brand"><span className="brand-mark"><Wallet size={25} /></span><span>FinanTrack</span></div>
    <nav>{items.map(({ label, icon: Icon }) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => onNavigate(label)}><Icon size={23} strokeWidth={1.9} /><span>{label}</span></button>)}</nav>
    <button className="new-movement"><Plus size={21} />Nuevo movimiento</button>
  </aside>;
}
