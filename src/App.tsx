import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';

export default function App() {
  const [active, setActive] = useState('Dashboard');
  return <div className="app"><Sidebar active={active} onNavigate={setActive} /><Dashboard /></div>;
}
