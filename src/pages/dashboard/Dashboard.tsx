import { ArrowDownLeft, ArrowUpRight, CircleDollarSign, CreditCard, HandCoins, Wallet } from 'lucide-react';
import MetricCard from '../../components/ui/MetricCard';
import IncomeExpenseChart from '../../components/charts/IncomeExpenseChart';
import CategoryDonut from '../../components/charts/CategoryDonut';
import RecentMovements from '../../components/ui/RecentMovements';
import AccountSummary from '../../components/ui/AccountSummary';

export default function Dashboard() {
  return (
    <main className="dashboard-main">
      <section className="metrics" aria-label="Resumen financiero">
        <MetricCard icon={Wallet} title="Dinero disponible" value={9064000} note="Suma de todas tus cuentas" />
        <MetricCard icon={CreditCard} title="En bancos y billeteras" value={8664000} />
        <MetricCard icon={CircleDollarSign} title="En efectivo" value={400000} />
        <MetricCard icon={ArrowUpRight} title="Ingresos del mes" value={3550000} note="3 movimiento(s)" tone="income" />
        <MetricCard icon={ArrowDownLeft} title="Gastos del mes" value={1680000} note="7 movimiento(s)" tone="expense" />
        <MetricCard icon={HandCoins} title="Me deben" value={1200000} />
      </section>
      <section className="charts" aria-label="Gráficos financieros">
        <IncomeExpenseChart />
        <CategoryDonut />
      </section>
      <section className="lower-grid" aria-label="Actividad y cuentas">
        <RecentMovements />
        <AccountSummary />
      </section>
    </main>
  );
}
