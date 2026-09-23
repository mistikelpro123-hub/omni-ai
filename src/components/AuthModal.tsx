import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, AlertCircle, ArrowRight, KeyRound, ShieldCheck, Cpu } from 'lucide-react';
import { UserRole, User } from '../types/auth';
import { authService } from '../services/authService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  initialRole?: UserRole;
  defaultTab?: 'login' | 'register' | 'demo';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialRole = 'user',
  defaultTab = 'login'
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [tab, setTab] = useState<'login' | 'register' | 'demo'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Exact Requested Accounts
  const simulatedAccounts = {
    user: [
      { email: 'carlos.mendez@gmail.com', name: 'Carlos Méndez', pass: 'carlos123', desc: 'Comprador recurrente (Tech)' },
      { email: 'sofia.morales@gmail.com', name: 'Sofía Morales', pass: 'sofia123', desc: 'Atleta y runner aficionada' },
      { email: 'lucas.silva@gmail.com', name: 'Lucas Silva', pass: 'lucas123', desc: 'Estudiante universitario' }
    ],
    admin: [
      { email: 'elena.admin@omni.ia', name: 'Elena Torres', pass: 'admin123', desc: 'Admin General de Operaciones' },
      { email: 'marcos.admin@omni.ia', name: 'Marcos Vega', pass: 'admin456', desc: 'Admin Auditoría y Tiendas' }
    ],
    developer: [
      { email: 'mistikelpro123@gmail.com', name: 'Ing. Propietario', pass: 'admin', desc: 'Acceso Google God Mode' },
      { email: 'alex.dev@omni.ia', name: 'Alex Rivera', pass: 'dev123', desc: 'Arquitecto Backend & Sistemas' },
      { email: 'clara.mlops@omni.ia', name: 'Clara Chen', pass: 'mlops123', desc: 'Líder de Redes & Tensores' }
    ]
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    try {
      const user = await authService.login(email, password);
      // Ensure target role compliance if specified
      if (selectedRole === 'developer' && user.role !== 'developer') {
        throw new Error('Esta cuenta no posee privilegios de Desarrollador (God Mode).');
      }
      if (selectedRole === 'admin' && user.role !== 'admin' && user.role !== 'developer') {
        throw new Error('Esta cuenta no posee privilegios de Administrador.');
      }
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    try {
      const user = await authService.register(email, password, name, selectedRole);
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async (googleEmail: string, googleName: string) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const user = await authService.loginWithGoogle(googleEmail, googleName, undefined, selectedRole);
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error con inicio de sesión Google');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (accountEmail: string, accountPass: string) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const user = await authService.login(accountEmail, accountPass);
      onAuthSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Error al ingresar con la cuenta seleccionada');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0c0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-6">
        
        {/* Header with Title & Close */}
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-xs text-white">
              Ω
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Acceso Independiente</h2>
              <p className="text-[11px] text-zinc-400">Autenticación segura con Hash PBKDF2 y Google Auth</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Independent Target Role Selector */}
        <div className="p-3 bg-zinc-950/90 border-b border-zinc-800/80">
          <div className="text-[10px] font-mono text-zinc-500 uppercase mb-1.5 px-1">
            1. Selecciona el Entorno a Ingresar:
          </div>
          <div className="grid grid-cols-3 gap-1.5 text-xs">
            <button
              onClick={() => { setSelectedRole('user'); setErrorMessage(''); }}
              className={`p-2 rounded-lg flex flex-col items-center gap-1 border transition-colors cursor-pointer ${
                selectedRole === 'user'
                  ? 'bg-zinc-800 border-zinc-600 text-white shadow-xs'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <UserIcon className="w-4 h-4 text-zinc-300" />
              <span className="font-medium text-center">1. Usuario</span>
            </button>

            <button
              onClick={() => { setSelectedRole('admin'); setErrorMessage(''); }}
              className={`p-2 rounded-lg flex flex-col items-center gap-1 border transition-colors cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-zinc-800 border-zinc-600 text-white shadow-xs'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-zinc-300" />
              <span className="font-medium text-center">2. Admin</span>
            </button>

            <button
              onClick={() => { setSelectedRole('developer'); setErrorMessage(''); }}
              className={`p-2 rounded-lg flex flex-col items-center gap-1 border transition-colors cursor-pointer ${
                selectedRole === 'developer'
                  ? 'bg-zinc-800 border-zinc-600 text-white shadow-xs'
                  : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Cpu className="w-4 h-4 text-zinc-300" />
              <span className="font-medium text-center">3. God Mode</span>
            </button>
          </div>
        </div>

        {/* Auth Method Tabs */}
        <div className="px-5 pt-3">
          <div className="flex items-center bg-zinc-900/80 p-0.5 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => { setTab('demo'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 px-2 font-medium rounded-md transition-colors cursor-pointer text-center ${
                tab === 'demo' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Cuentas Simuladas ({selectedRole === 'user' ? '3' : selectedRole === 'admin' ? '2' : '3'})
            </button>
            <button
              onClick={() => { setTab('login'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 px-2 font-medium rounded-md transition-colors cursor-pointer text-center ${
                tab === 'login' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => { setTab('register'); setErrorMessage(''); }}
              className={`flex-1 py-1.5 px-2 font-medium rounded-md transition-colors cursor-pointer text-center ${
                tab === 'register' ? 'bg-zinc-800 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Crear Cuenta
            </button>
          </div>
        </div>

        {/* Body Container */}
        <div className="p-5 space-y-4">
          {errorMessage && (
            <div className="p-2.5 bg-red-950/40 border border-red-900 text-red-300 rounded-lg text-xs flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB: SIMULATED ACCOUNTS FOR THE SELECTED ROLE */}
          {tab === 'demo' && (
            <div className="space-y-3">
              
              {/* Google Sign-In Header Button */}
              <div>
                <button
                  type="button"
                  onClick={() => {
                    const defaultGoogle = selectedRole === 'developer' 
                      ? { email: 'mistikelpro123@gmail.com', name: 'Ing. Propietario' }
                      : selectedRole === 'admin'
                      ? { email: 'elena.admin@omni.ia', name: 'Elena Torres' }
                      : { email: 'carlos.mendez@gmail.com', name: 'Carlos Méndez' };
                    handleGoogleAuth(defaultGoogle.email, defaultGoogle.name);
                  }}
                  disabled={loading}
                  className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continuar con Cuenta de Google ({selectedRole.toUpperCase()})</span>
                </button>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-zinc-800"></div>
                <span className="flex-shrink mx-2 text-[10px] text-zinc-500 font-mono">o selecciona perfil preconfigurado</span>
                <div className="flex-grow border-t border-zinc-800"></div>
              </div>

              {/* Exact Simulated Profile Cards */}
              <div className="space-y-2">
                {simulatedAccounts[selectedRole].map((acc, idx) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleQuickLogin(acc.email, acc.pass)}
                    disabled={loading}
                    className="w-full p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-colors flex items-center justify-between text-left cursor-pointer group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white group-hover:text-zinc-100">
                          {acc.name}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-500">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400 font-mono">{acc.email}</div>
                      <div className="text-[10px] text-zinc-500 mt-0.5">{acc.desc}</div>
                    </div>

                    <span className="text-xs font-mono text-zinc-300 bg-zinc-800 group-hover:bg-zinc-700 px-2.5 py-1 rounded transition-colors shrink-0">
                      Entrar →
                    </span>
                  </button>
                ))}
              </div>

            </div>
          )}

          {/* TAB: LOGIN FORM */}
          {tab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-zinc-400" />
                  <span>Correo Electrónico</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ej: usuario@omni.ia"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                  <KeyRound className="w-3 h-3 text-zinc-400" />
                  <span>Contraseña</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-zinc-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 mt-2"
              >
                <span>{loading ? 'Verificando Hash PBKDF2...' : `Ingresar como ${selectedRole.toUpperCase()}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* TAB: REGISTER FORM */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                  <UserIcon className="w-3 h-3 text-zinc-400" />
                  <span>Nombre Completo</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre y Apellido"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-zinc-400" />
                  <span>Correo Electrónico</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu.cuenta@ejemplo.com"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-zinc-400" />
                  <span>Contraseña (Se generará Salt y Hash)</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-zinc-600"
                />
              </div>

              <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
                Rol asignado: <strong className="text-white capitalize">{selectedRole}</strong>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 mt-2"
              >
                <span>{loading ? 'Generando Salt y Hash...' : 'Registrar Cuenta'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Cryptographic Security Details */}
          <div className="pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-mono text-center">
            Seguridad: PBKDF2 (HMAC-SHA512 · 10,000 iteraciones · Salt 16 bytes)
          </div>

        </div>
      </div>
    </div>
  );
};
