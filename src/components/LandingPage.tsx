import React from 'react';
import {
  Smartphone,
  Laptop,
  Footprints,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Check,
  Search,
  Sparkles
} from 'lucide-react';
import { UserRole } from '../types/auth';

interface LandingPageProps {
  onOpenAuth: (role?: UserRole, defaultTab?: 'login' | 'register' | 'demo') => void;
  onExplorePublicDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth
}) => {
  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
      
      {/* Minimal Header */}
      <header className="sticky top-0 z-40 bg-[#090a0f]/90 backdrop-blur-md border-b border-zinc-800/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-950 font-mono font-bold text-sm">
              Ω
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold tracking-tight text-white">
                Omni<span className="text-zinc-400">.IA</span>
              </span>
              <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline">
                Decision Engine
              </span>
            </div>
          </div>

          {/* Clean Navigation & CTAs */}
          <div className="flex items-center gap-2.5 text-xs">
            <button
              onClick={() => onOpenAuth('user', 'demo')}
              className="px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              Demo Rápida
            </button>

            <button
              onClick={() => onOpenAuth('admin', 'login')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Backoffice</span>
            </button>

            <button
              onClick={() => onOpenAuth('developer', 'login')}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>Dev Mode</span>
            </button>

            <button
              onClick={() => onOpenAuth('user', 'login')}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium transition-colors cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Minimalist & Breathable */}
      <section className="pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>ARQUITECTURA MULTIMODELO + ALGORITMO GENÉTICO</span>
          </div>

          {/* Clean Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.15]">
            Clasificación y optimización de compras con inteligencia artificial
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Compara simultáneamente especificaciones, valoraciones y fluctuaciones de precio en tiempo real. 
            Especializado en celulares, computadoras y calzado deportivo mediante frontera de Pareto.
          </p>

          {/* Clean Minimal CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => onOpenAuth('user', 'login')}
              className="px-6 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <span>Comenzar como Usuario</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenAuth('user', 'demo')}
              className="px-5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Explorar Demo
            </button>
          </div>

          {/* Quiet Trust Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-mono text-zinc-500">
            <span>Tiendas: Amazon · MercadoLibre · eBay · Best Buy</span>
            <span>•</span>
            <span>Seguridad: Hash PBKDF2</span>
            <span>•</span>
            <span>Costo: $0.00 USD/mes</span>
          </div>
        </div>
      </section>

      {/* Target Products: Clean Grid */}
      <section className="py-16 border-t border-zinc-900 bg-zinc-950/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          
          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Categorías Analizadas</p>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Los 3 dominios evaluados por el motor
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 1. Celulares */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-4 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-200">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white">Smartphones</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Extracción de chips de procesamiento, sensores ópticos, batería y pantallas OLED para ponderar el índice QPI calidad-precio.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500 space-y-1">
                <div className="flex justify-between">
                  <span>Métricas</span>
                  <span className="text-zinc-300">SoC · RAM · Sensor Óptico</span>
                </div>
                <div className="flex justify-between">
                  <span>Indexación</span>
                  <span className="text-zinc-400">Amazon · MercadoLibre</span>
                </div>
              </div>
            </div>

            {/* 2. Computadoras */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-4 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-200">
                <Laptop className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white">Computadoras & Laptops</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Evaluación de arquitectura térmica, rendimiento de GPUs dedicadas, latencia de memorias DDR5 y almacenamiento PCIe Gen4.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500 space-y-1">
                <div className="flex justify-between">
                  <span>Métricas</span>
                  <span className="text-zinc-300">GPU · Benchmarks · TDP</span>
                </div>
                <div className="flex justify-between">
                  <span>Indexación</span>
                  <span className="text-zinc-400">Best Buy · Newegg · eBay</span>
                </div>
              </div>
            </div>

            {/* 3. Zapatos */}
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 space-y-4 hover:border-zinc-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-zinc-200">
                <Footprints className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-semibold text-white">Calzado & Running</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Análisis computacional de espumas de retorno de energía, compuestos de suela exterior y resistencia al desgaste kilométrico.
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500 space-y-1">
                <div className="flex justify-between">
                  <span>Métricas</span>
                  <span className="text-zinc-300">Amortiguación · Tracción</span>
                </div>
                <div className="flex justify-between">
                  <span>Indexación</span>
                  <span className="text-zinc-400">Nike · Amazon · ML</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Independent Views Overview */}
      <section className="py-20 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          
          <div className="space-y-1.5 max-w-xl">
            <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Arquitectura</p>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Tres entornos independientes según perfil
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Cada vista cuenta con permisos específicos y herramientas dedicadas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Environment 1 */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Módulo 01 / Usuario
                </div>
                <h3 className="text-base font-semibold text-white">Buscador & Optimizador</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Entorno para consumidores. Incluye búsqueda en lenguaje natural, comparador y optimización multiobjetivo por algoritmo genético.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    <span>Frontera de Pareto presupuesto/calidad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    <span>Tendencias temporales de precio</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('user', 'login')}
                className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-medium transition-colors cursor-pointer"
              >
                Abrir Vista Usuario →
              </button>
            </div>

            {/* Environment 2 */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Módulo 02 / Backoffice
                </div>
                <h3 className="text-base font-semibold text-white">Panel de Administración</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Monitor para administradores con métricas de búsquedas, volumen de optimizaciones y tabla de usuarios con contraseñas en hash PBKDF2.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    <span>Auditoría de BBDD criptográfica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    <span>Indicadores de ahorro por usuario</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('admin', 'login')}
                className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-medium transition-colors cursor-pointer"
              >
                Acceder a Backoffice →
              </button>
            </div>

            {/* Environment 3 */}
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Módulo 03 / Desarrollador
                </div>
                <h3 className="text-base font-semibold text-white">Sustentación Técnica</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Documentación matemática interactiva de Transformers, CNN, LSTM, algoritmo genético y justificación de arquitectura Cloud gratuita.
                </p>
                <div className="pt-2 space-y-1.5 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    <span>Formulaciones y tensores en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-zinc-300 shrink-0" />
                    <span>Métricas de diagnóstico y latencias</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenAuth('developer', 'login')}
                className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-medium transition-colors cursor-pointer"
              >
                Ver Modo Desarrollador →
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="mt-auto border-t border-zinc-900 py-8 text-xs text-zinc-500 font-mono">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-zinc-300 font-medium font-sans">Omni.IA</span>
            <span>—</span>
            <span>Sistema Multimodelo de Optimización de Compras</span>
          </div>
          <div className="text-[11px] text-zinc-500">
            PBKDF2 Hash · React 19 · Node.js · Cloud Run
          </div>
        </div>
      </footer>

    </div>
  );
};
