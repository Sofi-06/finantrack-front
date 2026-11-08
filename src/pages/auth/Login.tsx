import { FormEvent, useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../services/api';
import brandIcon from '../../images/Insignia circular dorada con billetera blanca.png';
import financeIllustration from '../../images/Finanzas digitales con alcancía y monedas.png';
import './login.css';
import './login-compact.css';

type LoginResponse = {
  access_token: string;
  user: { id: string; name: string; email: string };
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
      const storage = remember ? localStorage : sessionStorage;
      const otherStorage = remember ? sessionStorage : localStorage;
      otherStorage.removeItem('access_token');
      otherStorage.removeItem('user');
      storage.setItem('access_token', data.access_token);
      storage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      if (axios.isAxiosError(requestError) && requestError.response?.status === 401) {
        setError('El correo o la contraseña no son correctos.');
      } else if (axios.isAxiosError(requestError) && !requestError.response) {
        setError('No pudimos conectar con el servidor. Verifica que el backend esté activo.');
      } else {
        setError('No pudimos iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-hero" aria-label="Presentación de FinanTrack">
        <div className="login-brand"><img src={brandIcon} alt="" /><span>FinanTrack</span></div>
        <div className="login-message">
          <h1>Controla tus finanzas,<br />alcanza tus metas</h1>
          <p>Registra tus ingresos, gastos y movimientos<br />de forma sencilla y segura.</p>
        </div>
        <img className="login-illustration" src={financeIllustration} alt="Computador con gráficas, monedas, planta y alcancía" />
      </section>

      <section className="login-panel">
        <div className="login-card">
          <div className="login-mobile-brand" aria-label="FinanTrack">
            <img src={brandIcon} alt="" />
            <span>FinanTrack</span>
          </div>
          <header className="login-card-heading">
            <h2>¡Bienvenido de nuevo!</h2>
            <p>Ingresa a tu cuenta y mantén tus finanzas<br />{' '}bajo control.</p>
          </header>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Correo electrónico</label>
            <div className="login-input-wrap">
              <Mail aria-hidden="true" />
              <input id="email" type="email" autoComplete="email" placeholder="ejemplo@correo.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
            <label htmlFor="password">Contraseña</label>
            <div className="login-input-wrap">
              <LockKeyhole aria-hidden="true" />
              <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Ingresa tu contraseña" value={password} onChange={(event) => setPassword(event.target.value)} required />
              <button className="password-toggle" type="button" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff /> : <Eye />}</button>
            </div>
            <div className="login-options">
              <label className="remember-option">
                <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
                <span aria-hidden="true" />Recordarme
              </label>
              <button className="forgot-password" type="button">¿Olvidaste tu contraseña?</button>
            </div>
            {error && <p className="login-error" role="alert">{error}</p>}
            <button className="login-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Iniciando sesión…' : 'Iniciar sesión'}</button>
          </form>
          <p className="login-register">¿No tienes una cuenta? <Link to="/register">Crear cuenta</Link></p>
        </div>
      </section>
    </main>
  );
}
