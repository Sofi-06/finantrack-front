import { ChevronLeft, ChevronRight } from 'lucide-react';

type NavbarProps = {
  title: string;
  subtitle?: string;
  month?: string;
  initials?: string;
  onPreviousMonth?: () => void;
  onNextMonth?: () => void;
};

export default function Navbar({
  title,
  subtitle,
  month,
  initials = 'MC',
  onPreviousMonth,
  onNextMonth,
}: NavbarProps) {
  return (
    <header className="topbar">
      <div className="topbar-copy">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

      <div className="header-actions">
        {month && (
          <div className="month-picker" aria-label={`Periodo actual: ${month}`}>
            <button type="button" onClick={onPreviousMonth} aria-label="Mes anterior">
              <ChevronLeft size={20} />
            </button>
            <span>{month}</span>
            <button type="button" onClick={onNextMonth} aria-label="Mes siguiente">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
        <button type="button" className="avatar" aria-label="Abrir perfil">
          {initials}
        </button>
      </div>
    </header>
  );
}
