import React, { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, LogOut, AlertCircle, Shield } from 'lucide-react';
import { User } from '../types/auth';
import { authService } from '../services/authService';

interface BackofficeViewProps {
  user: User;
  onLogout: () => void;
  onSwitchView: (view: 'user' | 'backoffice' | 'developer') => void;
}

export const BackofficeView: React.FC<BackofficeViewProps> = ({
  user,
  onLogout
}) => {
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await authService.getBackofficeDashboard();
      setUsersList(data.users || []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = usersList.filter(u => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return true;
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.role && u.role.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      
      {/* Header Minimalista */}
      <header className="border-b border-zinc-800/80 bg-[#090a0f]/90 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-sm text-white">Omni<span className="text-zinc-500">.IA</span></span>
            <span className="text-zinc-700">/</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-950/40 border border-blue-900/60 text-[11px] font-mono text-blue-300">
              <Shield className="w-3 h-3" />
              <span>Administrador</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="w-6 h-6 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700 shrink-0">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <span className="hidden sm:inline font-medium text-zinc-200">{user.name}</span>
            </div>

            <button
              onClick={fetchUsers}
              disabled={loading}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
              title="Recargar usuarios"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-zinc-200' : ''}`} />
            </button>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-300 hover:bg-zinc-900 transition-colors cursor-pointer"
              title="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal: Únicamente Tabla Minimalista de Usuarios */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {error && (
          <div className="p-3 bg-red-950/40 border border-red-900 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-white tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-zinc-400" />
              <span>Usuarios Entrantes</span>
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Registro minimalista de usuarios del sistema y roles asignados.
            </p>
          </div>

          {/* Barra de Búsqueda Rápida */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filtrar por nombre, correo o rol..."
              className="w-full pl-8 pr-3 py-1.5 bg-zinc-900/60 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
        </div>

        {/* Tabla Minimalista */}
        <div className="border border-zinc-800/80 rounded-xl bg-zinc-900/30 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-950/80 text-[11px] font-mono uppercase text-zinc-400 border-b border-zinc-800/80">
                <tr>
                  <th className="py-3 px-4">Usuario</th>
                  <th className="py-3 px-4">Correo Electrónico</th>
                  <th className="py-3 px-4">Rol Asignado</th>
                  <th className="py-3 px-4">Registro</th>
                  <th className="py-3 px-4 text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                {loading && usersList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs text-zinc-500 font-mono">
                      Cargando lista de usuarios...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-xs text-zinc-500">
                      No se encontraron usuarios coincidentes.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-zinc-800/25 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full bg-zinc-800 overflow-hidden border border-zinc-700/80 shrink-0">
                            <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-white">{u.name}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px]">
                        {u.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${
                          u.role === 'developer'
                            ? 'bg-purple-950/60 text-purple-300 border-purple-800/60'
                            : u.role === 'admin'
                            ? 'bg-blue-950/60 text-blue-300 border-blue-800/60'
                            : 'bg-zinc-800/70 text-zinc-300 border-zinc-700/80'
                        }`}>
                          {u.role === 'developer' ? 'God Mode' : u.role === 'admin' ? 'Admin' : 'Usuario'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-500 text-[11px]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Activo
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 bg-zinc-950/60 border-t border-zinc-800/70 text-[11px] text-zinc-500 font-mono flex items-center justify-between">
            <span>Total usuarios: {usersList.length}</span>
            <span>Vista de Administrador simplificada</span>
          </div>
        </div>

      </main>

      <footer className="border-t border-zinc-900 py-6 text-center text-xs text-zinc-500 font-mono">
        <p>Omni.IA • Panel Administrador Minimalista</p>
      </footer>

    </div>
  );
};
