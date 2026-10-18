import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Navbar() {
  return <header><div><h1>Dashboard</h1><p>Tu resumen financiero del mes</p></div><div className="header-actions"><div className="month"><ChevronLeft size={20} /><span>Agosto 2026</span><ChevronRight size={20} /></div><div className="avatar">MC</div></div></header>;
}
