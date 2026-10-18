import { ArrowDownLeft, ArrowUpRight, ArrowLeftRight } from 'lucide-react';
const items = [
  ['Pago de Estela','22 ago · Efectivo · Otros ingresos','+ $ 400.000','income'],
  ['Proyecto freelance','20 ago · Nequi · Trabajo independiente','+ $ 650.000','income'],
  ['Ropa','18 ago · Falabella · Compras','− $ 115.000','expense'],
  ['Consulta médica','16 ago · Nequi · Salud','− $ 85.000','expense'],
  ['Cine y salidas','14 ago · Falabella · Entretenimiento','− $ 96.000','expense'],
  ['Transferencia a Nequi','12 ago · Bancolombia','$ 300.000','transfer'],
] as const;
export default function RecentMovements() { return <article className="list-card movements-card"><div className="list-heading"><h2>Últimos movimientos</h2><button>Ver todos</button></div>{items.map(([title, detail, amount, type]) => <div className="movement-row" key={title}><span className={'movement-icon ' + type}>{type === 'income' ? <ArrowUpRight size={21}/> : type === 'expense' ? <ArrowDownLeft size={21}/> : <ArrowLeftRight size={21}/>}</span><div className="movement-info"><strong>{title}</strong><small>{detail}</small></div><b className={type}>{amount}</b></div>)}</article>; }
