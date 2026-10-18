import { Banknote } from 'lucide-react';
const accounts = [['Bancolombia','$ 7.780.000'],['Nequi','$ 665.000'],['Efectivo','$ 400.000'],['Falabella','$ 219.000']];
export default function AccountSummary() { return <article className="list-card accounts-card"><div className="list-heading"><h2>Resumen de cuentas</h2><button>Gestionar</button></div>{accounts.map(([name, value]) => <div className="account-row" key={name}><span className="account-icon"><Banknote size={21}/></span><strong>{name}</strong><b>{value}</b></div>)}</article>; }
