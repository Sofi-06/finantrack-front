import { FormEvent, useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../services/api';
import brandIcon from '../../images/Insignia circular dorada con billetera blanca.png';
import registerIllustration from '../../images/Registro finanzas con metas.png';
import './register.css';

type RegisterResponse = {
  access_token: string;
  user: { id: string; name: string; email: string };
};

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!acceptedTerms) {
      setError('Debes aceptar los términos y la política de privacidad.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await api.post<RegisterResponse>('/auth/register', {
        name: `${firstName.trim()} ${lastName.trim()}`.trim(),
        email: email.trim(),
        password,
      });
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('user');
      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      if (axios.isAxiosError(requestError) && requestError.response?.status === 409) {
        setError('Este correo ya está registrado. Intenta iniciar sesión.');
      } else if (axios.isAxiosError(requestError) && !requestError.response) {
        setError('No pudimos conectar con el servidor. Verifica que el backend esté activo.');
      } else {
        setError('No pudimos crear tu cuenta. Verifica los datos e inténtalo de nuevo.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="register-page">
      <section className="register-hero" aria-label="Presentación de FinanTrack">
        <div className="register-brand"><img src={brandIcon} alt="" /><span>FinanTrack</span></div>
        <div className="register-message">
          <h1>Crea tu cuenta</h1>
          <p>Comienza a gestionar tus ingresos,<br />gastos y metas en un solo lugar.</p>
        </div>
        <div className="register-art-backdrop" aria-hidden="true" />
        <img className="register-illustration" src={registerIllustration} alt="Lista de metas financieras con monedas, una alcancía y una diana" />
      </section>

      <section className="register-panel">
        <div className="register-card">
          <div className="register-mobile-brand" aria-label="FinanTrack"><img src={brandIcon} alt="" /><span>FinanTrack</span></div>
          <header className="register-heading">
            <h2>Regístrate en FinanTrack</h2>
            <p>Completa tus datos para crear tu cuenta.</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="register-name-row">
              <div className="register-field">
                <label htmlFor="first-name">Nombre</label>
                <div className="register-input-wrap"><UserRound aria-hidden="true" /><input id="first-name" autoComplete="given-name" placeholder="Tu nombre" value={firstName} onChange={(event) => setFirstName(event.target.value)} required /></div>
              </div>
              <div className="register-field">
                <label htmlFor="last-name">Apellido</label>
                <div className="register-input-wrap"><UserRound aria-hidden="true" /><input id="last-name" autoComplete="family-name" placeholder="Tu apellido" value={lastName} onChange={(event) => setLastName(event.target.value)} required /></div>
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="register-email">Correo electrónico</label>
              <div className="register-input-wrap"><Mail aria-hidden="true" /><input id="register-email" type="email" autoComplete="email" placeholder="ejemplo@correo.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></div>
            </div>

            <div className="register-field">
              <label htmlFor="register-password">Contraseña</label>
              <div className="register-input-wrap">
                <LockKeyhole aria-hidden="true" />
                <input id="register-password" type={showPassword ? 'text' : 'password'} minLength={8} autoComplete="new-password" placeholder="Crea una contraseña" value={password} onChange={(event) => setPassword(event.target.value)} required />
                <button className="register-password-toggle" type="button" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowPassword((visible) => !visible)}>{showPassword ? <EyeOff /> : <Eye />}</button>
              </div>
            </div>

            <div className="register-field">
              <label htmlFor="confirm-password">Confirmar contraseña</label>
              <div className="register-input-wrap">
                <LockKeyhole aria-hidden="true" />
                <input id="confirm-password" type={showConfirmation ? 'text' : 'password'} minLength={8} autoComplete="new-password" placeholder="Confirma tu contraseña" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                <button className="register-password-toggle" type="button" aria-label={showConfirmation ? 'Ocultar contraseña' : 'Mostrar contraseña'} onClick={() => setShowConfirmation((visible) => !visible)}>{showConfirmation ? <EyeOff /> : <Eye />}</button>
              </div>
            </div>

            <label className="register-terms">
              <input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} />
              <span className="register-check" aria-hidden="true" />
              <span>Acepto los <a href="#terms">Términos y Condiciones</a> y la <a href="#privacy">Política de Privacidad</a></span>
            </label>

            <div className="register-feedback" aria-live="polite">{error && <p role="alert">{error}</p>}</div>
            <button className="register-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}</button>
          </form>

          <p className="register-login">¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
        </div>
      </section>
    </main>
  );
}
