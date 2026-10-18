import type { LucideIcon } from 'lucide-react';

type Props = { icon: LucideIcon; title: string; value: number; note?: string; tone?: string };
const money = (value: number) => '$ ' + value.toLocaleString('es-CO');

export default function MetricCard({ icon: Icon, title, value, note, tone = 'neutral' }: Props) {
  return <article className="metric"><div className={'metric-icon ' + tone}><Icon size={21} /></div><div className="metric-title">{title}</div><strong>{money(value)}</strong>{note && <small>{note}</small>}</article>;
}
